import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

export default function InstructorManagement() {
  const [search, setSearch] = useState("");
  const [instructors, setInstructors] = useState<any[]>([]);
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this instructor account?"))
      return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/instructors/${id}`, {
        method: "DELETE",
      });
      setInstructors((prev) => prev.filter((ins) => ins.instructor_id !== id));
    } catch (err) {
      console.error("[ERROR] Gagal delete instructor:", err);
    }
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/instructors`
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setInstructors(data);
        } else {
          console.error("[ERROR] Data tidak valid:", data);
        }
      } catch (err) {
        console.error("[ERROR] Gagal fetch instructors:", err);
      }
    };

    fetchInstructors();
  }, []);
  const filtered = instructors.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search for Instructor on here"
          className="w-1/3 rounded-full px-4 shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="bg-[#B2A78C] text-white rounded-md"
          onClick={() => navigate("/instructors/add")}
        >
          + New Action
        </Button>
      </div>

      <Card className="overflow-x-auto">
        <CardContent>
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-sm font-semibold text-gray-700 border-b">
                <th className="p-4">Name</th>
                <th>ID</th>
                <th>Mastery</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(
                (i) => (
                  console.log("[DEBUG INSTRUCTOR]", i),
                  (
                    <tr
                      key={i.instructor_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${
                            i.image
                          }`}
                          alt={i.name}
                          className="w-10 h-10 rounded-full object-cover"
                          onClick={() =>
                            setPreviewImage(
                              `${import.meta.env.VITE_API_URL}/uploads/${
                                i.image
                              }`
                            )
                          }
                        />
                        <span>{i.name}</span>
                      </td>
                      <td>{i.instructor_id}</td>
                      <td>{i.mastery}</td>
                      <td>{i.email}</td>
                      <td>
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
                        ${
                          i.status === "Active"
                            ? "bg-green-800 text-white"
                            : "bg-red-700 text-white"
                        }`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-4l5-5-1.5-1.5L9 11l-1.5-1.5L6 11l3 3z" />
                          </svg>
                          {i.status}
                        </span>
                      </td>
                      <td className="space-x-3">
                        <Button
                          onClick={() =>
                            navigate(`/instructors/edit/${i.instructor_id}`)
                          }
                          variant="secondary"
                          className="bg-yellow-400 hover:bg-yellow-500 p-2"
                        >
                          <FaEdit className="text-black" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(i.instructor_id)}
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700 p-2"
                        >
                          <FaTrash className="text-white" />
                        </Button>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>

          {previewImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              onClick={() => setPreviewImage(null)}
            >
              <div
                className="bg-white p-4 rounded shadow-lg max-w-[90vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // biar klik dalam gambar ga close
              >
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-h-[80vh] max-w-[80vw] object-contain rounded"
                />
                <div className="text-center mt-3">
                  <Button
                    onClick={() => setPreviewImage(null)}
                    className="mt-2"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
