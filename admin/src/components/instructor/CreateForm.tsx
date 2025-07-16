import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddInstructorForm() {
const navigate = useNavigate();
const [mastery, setMastery] = useState<string[]>([]);

useEffect(() => {
  const fetchMastery = async () => {
    try {
              console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/instructors/mastery`);
      const data = await res.json();
      console.log('[DEBUG] mastery:', data);
      setMastery(data);
    } catch (err) {
      console.error('[ERROR] Fetch mastery failed:', err);
    }
  };
  fetchMastery();
}, []);


  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    mastery: '',
    status: 'Active',
  });
  const [image, setImage] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.mastery || !image) {
      setError(true);
      setSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('mastery', form.mastery);
    formData.append('status', form.status);
    formData.append('image', image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/instructors`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Gagal upload');

      navigate('/instructors');
    } catch (err) {
      setError(true);
      setSuccess(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: '', email: '', phone: '', mastery: '', status: 'Active' });
    setImage(null);
    setError(false);
    setSuccess(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-bold">Add New Instructor</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Full Name</label>
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" />
        </div>

        <div>
          <label className="font-medium">Phone</label>
          <Input name="phone" value={form.phone} onChange={handleChange} placeholder="08xxxxxxxx" />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <Input name="email" value={form.email} onChange={handleChange} placeholder="example@mail.com" />
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
          {mastery.map((m) => (
            <option key={m} value={m}>
                {m}
            </option>
          ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="font-medium">Profile Image</label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>

      <div className="space-x-4">
        <Button type="submit" className="bg-bluberi text-white hover:bg-[#2B5288]">
          Save New
        </Button>
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>

      {success && (
        <div className="flex items-center gap-2 text-green-600 bg-green-100 p-3 mt-4 rounded-md border border-green-300">
          <CheckCircle2 className="w-5 h-5" />
          <p>Successfully Added New Instructor!</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-100 p-3 mt-4 rounded-md border border-red-300">
          <XCircle className="w-5 h-5" />
          <p>Failed to submit. Please fill all fields and upload image.</p>
        </div>
      )}
    </form>
  );
}
