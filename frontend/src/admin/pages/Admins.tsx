import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Admin {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("token");

  /* ================= FETCH ADMINS ================= */

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("⚠️ Please login first");
        return;
      }

      const res = await fetch("http://localhost:5000/api/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to load admins");
        return;
      }

      setAdmins(data);
    } catch (error) {
      console.error(error);
      setError("Error fetching admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  /* ================= ADD / UPDATE ================= */

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("⚠️ Session expired. Please login again.");
        return;
      }

      const url = editingId
        ? `http://localhost:5000/api/admins/${editingId}`
        : "http://localhost:5000/api/admins";

      const method = editingId ? "PUT" : "POST";

      const bodyData = editingId
        ? { name: form.name, email: form.email }
        : form;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Operation failed");
        return;
      }

      setForm({ name: "", email: "", password: "" });
      setEditingId(null);

      fetchAdmins();
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this admin?")) return;

    try {
      const token = getToken();

      const res = await fetch(
        `http://localhost:5000/api/admins/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Delete failed");
        return;
      }

      fetchAdmins();
    } catch (error) {
      console.error(error);
      setError("Delete failed");
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (admin: Admin) => {
    setForm({
      name: admin.name,
      email: admin.email,
      password: "",
    });
    setEditingId(admin.id);
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Admin Management
        </h1>
        <p className="text-sm text-slate-500">
          Manage administrators and their access roles
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div className="bg-white border rounded-xl p-6">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >

          <input
            type="text"
            placeholder="Name"
            className="border rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-3 py-2"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          {!editingId && (
            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg px-3 py-2"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Plus size={16} />
            {editingId ? "Update Admin" : "Add Admin"}
          </button>

        </form>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">

        {loading ? (
          <p className="text-center py-6">Loading...</p>
        ) : (
          <table className="w-full text-sm">

            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {admins.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-slate-500">
                    No admins found
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin.id}>

                    <td className="px-6 py-4">{admin.name}</td>
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4">
                      {admin.created_at
                        ? new Date(admin.created_at).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="px-6 py-4 flex justify-end gap-3">
                      <button onClick={() => handleEdit(admin)}>
                        <Pencil size={16} />
                      </button>

                      <button onClick={() => handleDelete(admin.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}