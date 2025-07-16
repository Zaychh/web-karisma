// AddProgramForm.tsx (Final Version + Backend Integrated)

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import axios from "axios";

interface Tool {
  judul: string;
  deskripsi: string;
  image: File | null;
}

interface Sesi {
  judul_sesi: string;
  topik: string;
  video: File | null;
  quiz: {
    soal: string;
    jawaban: string[];
    benar: number;
  };
  tugas: {
    soal_tugas: string;
  };
}

export default function AddProgramForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null as File | null,
  });

  const [tools, setTools] = useState<Tool[]>([]);
  const [sesi, setSesi] = useState<Sesi[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("/api/program/categories")
      .then((res) => {
        const result = res.data;

        if (Array.isArray(result)) {
          setCategories(result);
          if (result.length > 0) {
            setForm((prev) => ({ ...prev, category: result[0] }));
          }
        } else {
          console.warn("Kategori bukan array:", result);
          setCategories([]);
        }
      })
      .catch((err) => {
        console.error("Gagal fetch kategori:", err);
        setCategories([]);
      });
  }, []);

  const addTool = () => {
    setTools([...tools, { judul: "", deskripsi: "", image: null }]);
  };

  const updateTool = (index: number, key: keyof Tool, value: string | File) => {
    const newTools = [...tools];
    newTools[index][key] = value as any;
    setTools(newTools);
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const addSesi = () => {
    setSesi([
      ...sesi,
      {
        judul_sesi: "",
        topik: "",
        video: null,
        quiz: { soal: "", jawaban: ["", "", "", ""], benar: 0 },
        tugas: { soal_tugas: "" },
      },
    ]);
  };

  const updateSesi = (index: number, key: keyof Sesi, value: any) => {
    const newSesi = [...sesi];
    newSesi[index][key] = value;
    setSesi(newSesi);
  };

  const removeSesi = (index: number) => {
    setSesi(sesi.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("category", form.category);
    if (form.image) data.append("image", form.image);

    tools.forEach((tool, i) => {
      data.append(`tools[${i}][judul]`, tool.judul);
      data.append(`tools[${i}][deskripsi]`, tool.deskripsi);
      if (tool.image) data.append(`tools[${i}][image]`, tool.image);
    });

    sesi.forEach((s, i) => {
      data.append(`sesi[${i}][judul_sesi]`, s.judul_sesi);
      data.append(`sesi[${i}][topik]`, s.topik);
      if (s.video) data.append(`sesi[${i}][video]`, s.video);
      data.append(`sesi[${i}][quiz][soal]`, s.quiz.soal);
      s.quiz.jawaban.forEach((j, jdx) =>
        data.append(`sesi[${i}][quiz][jawaban][${jdx}]`, j)
      );
      data.append(`sesi[${i}][quiz][benar]`, s.quiz.benar.toString());
      data.append(`sesi[${i}][tugas][soal_tugas]`, s.tugas.soal_tugas);
    });

    try {
      await axios.post("/api/program", data);
      alert("Program berhasil ditambahkan");
    } catch (err) {
      console.error("Gagal submit:", err);
    }
  };

  return (
    <div className="space-y-8 bg-white p-8 shadow-md rounded-xl max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold">Add New Program / Class</h1>

      {/* Form Utama */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <Select
          value={form.category}
          onValueChange={(v) => setForm({ ...form, category: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.length > 0 ? (
              categories.map((cat, i) => (
                <SelectItem key={i} value={cat}>
                  {cat}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-gray-500">
                No categories found
              </div>
            )}
          </SelectContent>
        </Select>
        <Input
          type="file"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files?.[0] || null })
          }
        />
        <Textarea
          placeholder="Program Description"
          className="col-span-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      {/* Tools Section */}
      <div>
        <h2 className="text-lg font-semibold">Tools</h2>
        {tools.map((tool, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 border p-3 rounded"
          >
            <Input
              placeholder="Tool Name"
              value={tool.judul}
              onChange={(e) => updateTool(idx, "judul", e.target.value)}
            />
            <Input
              placeholder="Tool Description"
              value={tool.deskripsi}
              onChange={(e) => updateTool(idx, "deskripsi", e.target.value)}
            />
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) updateTool(idx, "image", file);
              }}
            />
            <Button
              type="button"
              onClick={() => removeTool(idx)}
              variant="destructive"
              className="col-span-full w-fit mt-1"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addTool} variant="outline">
          + Add Tool
        </Button>
      </div>

      {/* Sesi Section */}
      <div>
        <h2 className="text-lg font-semibold">Sessions</h2>
        {sesi.map((s, idx) => (
          <div key={idx} className="border p-4 rounded mb-6 space-y-2">
            <Input
              placeholder="Session Title"
              value={s.judul_sesi}
              onChange={(e) => updateSesi(idx, "judul_sesi", e.target.value)}
            />
            <Input
              placeholder="Topic"
              value={s.topik}
              onChange={(e) => updateSesi(idx, "topik", e.target.value)}
            />
            <Input
              type="file"
              onChange={(e) => {
                const updated = [...sesi];
                updated[idx].video = e.target.files?.[0] || null;
                setSesi(updated);
              }}
            />
            <Textarea
              placeholder="Task Instruction"
              value={s.tugas.soal_tugas}
              onChange={(e) => {
                const updated = [...sesi];
                updated[idx].tugas.soal_tugas = e.target.value;
                setSesi(updated);
              }}
            />
            <div className="space-y-2">
              <Input
                placeholder="Quiz Question"
                value={s.quiz.soal}
                onChange={(e) => {
                  const updated = [...sesi];
                  updated[idx].quiz.soal = e.target.value;
                  setSesi(updated);
                }}
              />
              {s.quiz.jawaban.map((ans, ansIdx) => (
                <Input
                  key={ansIdx}
                  placeholder={`Answer ${ansIdx + 1}`}
                  value={ans}
                  onChange={(e) => {
                    const updated = [...sesi];
                    updated[idx].quiz.jawaban[ansIdx] = e.target.value;
                    setSesi(updated);
                  }}
                />
              ))}
              <Select
                defaultValue={String(s.quiz.benar)}
                onValueChange={(v) => {
                  const updated = [...sesi];
                  updated[idx].quiz.benar = parseInt(v);
                  setSesi(updated);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  {s.quiz.jawaban.map((_, i) => (
                    <SelectItem key={i} value={String(i)}>
                      Answer {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              onClick={() => removeSesi(idx)}
              variant="destructive"
              className="mt-2"
            >
              Remove Session
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addSesi} variant="outline">
          + Add Session
        </Button>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}
