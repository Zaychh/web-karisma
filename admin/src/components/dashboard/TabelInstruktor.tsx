import { useState } from "react";
import teto from "../../assets/tetoooo.jpeg";
import miku from "../../assets/mikusnow.jpeg";
import Tom from "../../assets/tom.jpeg";

const instructors = [
  {
    name: "Kasane Teto",
    email: "tetojockey@gmail.com",
    course: "Web Development Bootcamp",
    photo: teto,
    status: "Aktif",
  },
  {
    name: "Karolina Kathrine",
    email: "karolinakath@gmail.com",
    course: "UI/UX Design Bootcamp",
    photo: miku,
    status: "Cuti",
  },
  {
    name: "Aji Makutagra",
    email: "ajimakutagra@gmail.com",
    course: "Data science Bootcamp",
    photo: Tom,
    status: "Nonaktif",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aktif":
      return "bg-green-100 text-green-700";
    case "Nonaktif":
      return "bg-red-100 text-red-700";
    case "Cuti":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function TabelInstruktor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

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
              <th className="py-2 px-4 border-b">Course</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <img
                    src={instructor.photo}
                    alt={instructor.name}
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    onClick={() => handleImageClick(instructor.photo)}
                  />
                </td>
                <td className="py-2 px-4 border-b font-medium">
                  {instructor.name}
                </td>
                <td className="py-2 px-4 border-b font-medium">
                  {instructor.email}
                </td>
                <td className="py-2 px-4 border-b font-medium">
                  {instructor.course}
                </td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      instructor.status
                    )}`}
                  >
                    {instructor.status}
                  </span>
                </td>
              </tr>
            ))}
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
            <img src={selectedImage} alt="Full View" className="max-w-full max-h-[80vh]" />
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