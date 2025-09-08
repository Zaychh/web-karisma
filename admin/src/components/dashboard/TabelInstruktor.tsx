import { useState, useEffect } from "react";

interface Instructor {
  instructor_id: number;
  name: string;
  email: string;
  mastery: string;
  status: "Active" | "Unactive";
  image: string | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700";
    case "Unactive":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function TabelInstruktor() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/instructors/all")
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.data) {
          setInstructors(resData.data as Instructor[]);
        }
      })
      .catch((err) => console.error("Failed to fetch instructors:", err));
  }, []);

  const handleImageClick = (url: string) => setSelectedImage(url);
  const closeModal = () => setSelectedImage(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Instructors</h3>
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="py-2 px-4 border-b">Foto</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Mastery</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => {
              // Tentukan URL gambar (kalau null, pakai avatar default)
              const imageUrl = instructor.image
                ? `/uploads/${instructor.image}`
                : "/default-avatar.png";

              return (
                <tr key={instructor.instructor_id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={imageUrl}
                      alt={instructor.name ?? "Instructor"}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                      onClick={() => handleImageClick(imageUrl)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b font-medium">{instructor.name ?? "-"}</td>
                  <td className="py-2 px-4 border-b font-medium">{instructor.email ?? "-"}</td>
                  <td className="py-2 px-4 border-b font-medium">{instructor.mastery ?? "-"}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        instructor.status ?? ""
                      )}`}
                    >
                      {instructor.status ?? "Unknown"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="max-w-full max-h-full p-4 overflow-auto bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-[80vh]"
            />
            <div className="text-center mt-3">
              <button
                onClick={closeModal}
                className="mt-2 px-4 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
