import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface Sesi {
  id: number;
  judul: string;
  topik: string;
  linkVideo: string;
  programId: number;
}

interface QuizQuestion {
  id: number;
  pertanyaan: string;
  opsi_a: string | null;
  opsi_b: string | null;
  opsi_c: string | null;
  opsi_d: string | null;
  opsi_a_id?: number | null;
  opsi_b_id?: number | null;
  opsi_c_id?: number | null;
  opsi_d_id?: number | null;
}

export default function Materi() {
  const { id: programId } = useParams();
  const [sessions, setSessions] = useState<Sesi[]>([]);
  const [quizBySesi, setQuizBySesi] = useState<{ [key: number]: QuizQuestion[] }>({});
  const [selectedAnswers, setSelectedAnswers] = useState<{ [quizId: number]: number }>({});
  const [submitted, setSubmitted] = useState<{ [sesiId: number]: boolean }>({});
  const [quizFeedback, setQuizFeedback] = useState<{ [sesiId: number]: string }>({});
  const [programTitle, setProgramTitle] = useState("");

  // 🔥 state baru untuk simpan jawaban benar (highlight hijau)
  const [correctAnswers, setCorrectAnswers] = useState<{ [quizId: number]: number }>({});

  // Ambil judul program
  useEffect(() => {
    if (!programId) return;
    fetch(`/api/program/${programId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.judul_program || data.title)) {
          setProgramTitle(data.judul_program || data.title);
        }
      })
      .catch((err) => console.error("❌ Gagal ambil program:", err));
  }, [programId]);

  // Ambil sesi
  useEffect(() => {
    if (!programId) return;
    fetch(`/api/program/${programId}/sesi`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.data ?? [];
        setSessions(list);
      })
      .catch((err) => console.error("❌ Gagal fetch sesi:", err));
  }, [programId]);

  // Ambil quiz per sesi + status user
  useEffect(() => {
    if (!sessions.length) return;

    (async () => {
      const token = localStorage.getItem("token");
      const newQuizBySesi: any = {};
      const newSelected: any = {};
      const newCorrect: any = {};
      const newSubmitted: any = {};
      const newFeedback: any = {};

      await Promise.all(
        sessions.map(async (sesi) => {
          try {
            const [quizRes, checkRes] = await Promise.all([
              fetch(`/api/quiz/siswa/sesi/${sesi.id}/quiz`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
              fetch(`/api/quiz/sesi/${sesi.id}/quiz/check`, {
                headers: { Authorization: `Bearer ${token}` },
              }),
            ]);

            const quizData = await quizRes.json();
            const checkData = await checkRes.json();

            newQuizBySesi[sesi.id] = Array.isArray(quizData?.data)
              ? quizData.data
              : Array.isArray(quizData)
              ? quizData
              : [];

            if (checkData?.success) {
              const answered = checkData.data.filter((q: any) => q.jawaban_id);

              if (answered.length > 0) {
                const allCorrect = answered.every((a: any) => a.is_correct === 1);
                newSubmitted[sesi.id] = allCorrect;

                answered.forEach((a: any) => {
                  if (a.jawaban_id) {
                    newSelected[a.quiz_id] = Number(a.jawaban_id);
                    if (a.is_correct === 1) {
                      newCorrect[a.quiz_id] = Number(a.jawaban_id);
                    }
                  }
                });

                newFeedback[sesi.id] = allCorrect
                  ? `✅ ${answered.length}/${answered.length} Jawaban benar! Progress kamu meningkat.`
                  : `❌ ${
                      answered.filter((a: any) => a.is_correct === 1).length
                    }/${answered.length} benar. Coba lagi ya!`;
              }
            }
          } catch (err) {
            console.error("❌ Error fetch quiz/check:", err);
          }
        })
      );

      setQuizBySesi(newQuizBySesi);
      setSelectedAnswers(newSelected);
      setCorrectAnswers(newCorrect);
      setSubmitted(newSubmitted);
      setQuizFeedback(newFeedback);
    })();
  }, [sessions]);

  // 🔥 fungsi submit quiz
  const handleSubmitQuiz = async (sesiId: number) => {
    const answers = (quizBySesi[sesiId] || [])
      .map((q) => ({
        id_quiz: q.id,
        jawaban_id: selectedAnswers[q.id],
      }))
      .filter((a) => a.jawaban_id != null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/quiz/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sesi_id: sesiId, answers }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      if (result?.success) {
        if (result.correct) {
          // ✅ jawaban benar
          setQuizFeedback((prev) => ({
            ...prev,
            [sesiId]: `✅ ${result.correctCount}/${result.total} Jawaban benar! Progress kamu meningkat.`,
          }));
          setSubmitted((prev) => ({ ...prev, [sesiId]: true }));

          setSelectedAnswers((prev) => {
            const updated = { ...prev };
            answers.forEach((a) => {
              updated[a.id_quiz] = Number(a.jawaban_id);
              setCorrectAnswers((prevCorrect) => ({
                ...prevCorrect,
                [a.id_quiz]: Number(a.jawaban_id),
              }));
            });
            return updated;
          });

          window.dispatchEvent(new Event("progress-updated"));

          // 🔥 cek apakah SEMUA sesi sudah selesai benar
          const allDone = sessions.every(
            (s) => submitted[s.id] || s.id === sesiId
          );

          if (allDone) {
            try {
              const resAch = await fetch(`/api/achievements/claim`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ programId }),
              });
              const data = await resAch.json();
              if (data.success) {
                Swal.fire({
                  title: "🎉 Selamat!",
                  text: data.achievement.description,
                  imageUrl: data.achievement.image,
                  imageAlt: data.achievement.name,
                  confirmButtonText: "Mantap!",
                  background: "#1D1D1D",
                  color: "#fff",
                });
              }
            } catch (err) {
              console.error("❌ Error klaim achievement:", err);
            }
          }
        } else {
          setQuizFeedback((prev) => ({
            ...prev,
            [sesiId]: `❌ ${result.correctCount}/${result.total} benar. Coba lagi ya!`,
          }));
        }
      } else {
        setQuizFeedback((prev) => ({
          ...prev,
          [sesiId]: "❌ Terjadi kesalahan saat submit.",
        }));
      }
    } catch (err) {
      console.error("❌ Gagal submit quiz:", err);
      setQuizFeedback((prev) => ({
        ...prev,
        [sesiId]: "❌ Terjadi kesalahan saat submit.",
      }));
    }
  };

  if (!sessions.length) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p>Loading sesi dan materi...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1D1D1D] min-h-screen text-white px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 leading-relaxed">
        Selamat datang di Bootcamp <br /> {programTitle || "Loading..."}
      </h1>

      {sessions.map((session, idx) => (
        <div key={`session-${session.id}`} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Session {idx + 1}: {session.judul}
          </h2>

          <div className="bg-white text-black py-4 px-6 rounded-xl shadow-md max-w-4xl mx-auto">
            <iframe
              src={session.linkVideo}
              className="w-full h-96 rounded"
              allowFullScreen
              title={`Video ${session.judul}`}
            ></iframe>
          </div>

          {(quizBySesi[session.id]?.length ?? 0) > 0 && (
            <div className="bg-gray-800 mt-6 p-6 rounded-xl max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Quiz</h3>

              {quizBySesi[session.id].map((q) => {
                const options = (
                  [
                    { id: q.opsi_a_id, text: q.opsi_a },
                    { id: q.opsi_b_id, text: q.opsi_b },
                    { id: q.opsi_c_id, text: q.opsi_c },
                    { id: q.opsi_d_id, text: q.opsi_d },
                  ] as { id?: number | null; text?: string | null }[]
                ).filter((o) => o.id && o.text) as { id: number; text: string }[];

                return (
                  <div key={`quiz-${q.id}`} className="mb-4">
                    <p className="font-medium mb-2">{q.pertanyaan}</p>
                    <div className="space-y-1">
                      {options.map((opt, i) => {
                        const isSelected =
                          selectedAnswers[q.id] === Number(opt.id);
                        const isCorrect = correctAnswers[q.id] === opt.id;

                        return (
                          <label
                            key={`q-${q.id}-opt-${opt.id}`}
                            className={`flex items-center space-x-2 cursor-pointer mb-2 
                              ${isCorrect ? "text-green-400 font-bold" : ""}`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                                ${
                                  isCorrect
                                    ? "border-green-400"
                                    : "border-gray-400"
                                }
                                ${
                                  isSelected
                                    ? isCorrect
                                      ? "bg-green-400"
                                      : "bg-gray-400"
                                    : ""
                                }`}
                            >
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-white"></span>
                              )}
                            </span>

                            <input
                              type="radio"
                              name={`quiz-${session.id}-${q.id}`}
                              value={opt.id}
                              disabled={submitted[session.id]}
                              checked={isSelected}
                              onChange={() =>
                                setSelectedAnswers((prev) => ({
                                  ...prev,
                                  [q.id]: Number(opt.id),
                                }))
                              }
                              className="hidden"
                            />

                            <span className="font-semibold mr-2">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            <span>{opt.text}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => handleSubmitQuiz(session.id)}
                disabled={submitted[session.id]}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-black font-bold cursor-pointer"
              >
                Submit Quiz
              </button>

              {quizFeedback[session.id] && (
                <p className="mt-3 text-sm text-white">
                  {quizFeedback[session.id]}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
