// AddProgramForm.tsx (dengan auto-redirect)

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
import api from "../../lib/api";

export default function AddProgramForm() {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null as File | null,
    instructor_id: 0,
  });

const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    api
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

  const handleSubmit = async () => {
    // Validasi form sebelum submit
    if (!form.title || !form.description || !form.price || !form.category) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    setIsLoading(true);
    
    const data = new FormData();
    data.append("title", form.title);
    data.append("deskripsi", form.description);
    data.append("harga", form.price);
    data.append("categories", form.category);
    if (form.image) data.append("image_cover", form.image);


    // Log data untuk debugging
    console.log("Form data yang akan dikirim:");
    console.log("Title:", form.title);
    console.log("Description:", form.description);
    console.log("Price:", form.price);
    console.log("Category:", form.category);
    // Debug FormData sebelum kirim
    debugFormData(data);

    try {
      const response = await api.post("/api/program", data);

      
      console.log("Response dari server:", response.data);
      
      // Berhasil - tampilkan alert dan redirect
      alert("Program berhasil ditambahkan");
      
      // Redirect ke halaman daftar program
      navigate("/program");
      
    } catch (err: any) {
      console.error("Error detail:", err);
      
      // Tampilkan error yang lebih detail
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
        
        // Coba ekstrak error message dari response
        let errorMessage = "Gagal menambahkan program.";
        if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data?.error) {
          errorMessage = err.response.data.error;
        }
        
        alert(`Error: ${errorMessage}`);
      } else if (err.request) {
        console.error("Request error:", err.request);
        alert("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      } else {
        console.error("Error:", err.message);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk membatalkan dan kembali
  const handleCancel = () => {
    navigate('/program'); // Kembali ke halaman sebelumnya
    // atau navigate("/programs"); // Kembali ke halaman tertentu
  };

  // Fungsi untuk debug FormData
  const debugFormData = (formData: FormData) => {
    console.log("=== FormData Debug ===");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, {
          name: value.name,
          size: value.size,
          type: value.type
        });
      } else {
        console.log(`${key}:`, value);
      }
    }
    console.log("=== End FormData Debug ===");
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

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button 
          type="button" 
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}