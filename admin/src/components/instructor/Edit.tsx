import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { XCircle } from 'lucide-react';

export default function EditInstructorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    mastery: '',
    status: 'Active',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [masteries, setMasteries] = useState<string[]>([]);
  const [error, setError] = useState(false);

  // Fetch list mastery
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/instructors/mastery`)
      .then((res) => res.json())
      .then((data) => setMasteries(data))
      .catch((err) => console.error('[ERROR] Fetch mastery failed:', err));
  }, []);

  // Fetch data by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/instructors/${id}`);
        const data = await res.json();
        setForm({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          mastery: data.mastery,
          status: data.status,
        });
        setImagePreview(`${import.meta.env.VITE_API_URL}/uploads/${data.image}`);
      } catch (err) {
        console.error('[ERROR] Gagal fetch instructor:', err);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('mastery', form.mastery);
    formData.append('status', form.status);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/instructors/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error('Gagal update');
      navigate('/instructors');
    } catch (err) {
      console.error('[ERROR] Update failed:', err);
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Edit Instructor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium">Full Name</label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <label className="font-medium">Phone</label>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <Input name="email" value={form.email} onChange={handleChange} />
          </div>

          <div>
            <label className="font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300"
            >
              <option value="Active">Active</option>
              <option value="Unactive">Unactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Mastery</label>
            <select
              name="mastery"
              value={form.mastery}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300"
            >
              <option value="">-- Select Mastery --</option>
              {masteries.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Change Profile Image (optional)</label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md shadow"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button type="submit" className="bg-bluberi text-white hover:bg-[#2B5288]">
            Update
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/instructors')}>
            Cancel
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 mt-4 rounded-md border border-red-300">
            <XCircle className="w-5 h-5" />
            <p>Failed to update instructor.</p>
          </div>
        )}
      </form>
    </div>
  );
}
