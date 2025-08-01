import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaEdit, FaUser } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";

interface User {
  user_id: number;
  name: string;
  email: string;
  role: string;
}

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this User account?"))
      return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user.user_id !== id));
        alert("User deleted successfully");
      } else {
        const error = await response.json();
        alert(`Failed to delete user: ${error.error}`)
      }
    } catch (err) {
      console.error("[ERROR] Gagal delete user:", err);
      alert("Failed to delete user. Please try again.");
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("[ERROR] Invalid data format:", data);
          setUsers([]);
        }
      } else {
        console.error("[ERROR] Failed to fetch users:", response.statusText);
        setUsers([]);
      }
    } catch (err) {
      console.error("[ERROR] Failed to fetch users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
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
          placeholder="Search for User by name or email..."
          className="w-1/3 rounded-full px-4 shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="overflow-x-auto">
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B2A78C]"></div>
              <span className="ml-2">Loading users...</span>
            </div>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-sm font-semibold text-gray-700 border-b">
                  <th className="p-4">User</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      {search ? "No users found matching your search" : "No users available"}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.user_id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#B2A78C] flex items-center justify-center">
                          <FaUser className="text-white text-sm" />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </td>
                      <td className="text-gray-600">{user.user_id}</td>
                      <td className="text-gray-600">{user.email}</td>
                      <td>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          {user.role}
                        </span>
                      </td>
                      <td className="space-x-3">
                        <Button
                          onClick={() =>
                            navigate(`/users/edit/${user.user_id}`)
                          }
                          variant="secondary"
                          className="bg-yellow-400 hover:bg-yellow-500 p-2"
                          title="Edit user"
                        >
                          <FaEdit className="text-black" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(user.user_id)}
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700 p-2"
                          title="Delete user"
                        >
                          <FaTrash className="text-white" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Statistics Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaUser className="text-blue-600 text-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Search Results</p>
                <p className="text-2xl font-bold text-gray-900">{filteredUsers.length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
