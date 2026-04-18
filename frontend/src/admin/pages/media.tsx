import { useState, useEffect } from "react";
import {
  Upload,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  type Media,
} from "@/admin/services/media.api";

const BASE_URL = "http://localhost:5000";

export default function Media() {
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Media | null>(null);

  const [caption, setCaption] = useState("");
  const [type, setType] = useState<"gallery" | "committee">("gallery");
  const [file, setFile] = useState<File | null>(null);

  /* ================= FETCH ================= */
  const fetchMedia = async () => {
    try {
      const data = await getMedia();
      setMediaList(data);
    } catch {
      toast.error("Failed to fetch media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file && !editingItem) {
      toast.error("Please select a file");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        file: file || undefined,
        caption: caption.trim(),
        section: "iqac", // ✅ ALWAYS FIXED
        category: type,  // ✅ gallery | committee
      };

      if (editingItem) {
        await updateMedia(editingItem.id, payload);
        toast.success("Updated successfully");
      } else {
        await createMedia(payload as any);
        toast.success("Uploaded successfully");
      }

      fetchMedia();
      closeModal();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Error saving media");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this media?")) return;

    try {
      await deleteMedia(id);
      toast.success("Deleted successfully");
      fetchMedia();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= MODAL ================= */
  const openModal = (item?: Media) => {
    if (item) {
      setEditingItem(item);
      setCaption(item.caption || "");
      setType(item.category === "committee" ? "committee" : "gallery");
      setFile(null);
    } else {
      setEditingItem(null);
      setCaption("");
      setType("gallery");
      setFile(null);
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFile(null);
    setCaption("");
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex justify-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Media Library</h1>

        <button
          onClick={() => openModal()}
          className="bg-indigo-600 text-white px-4 py-2 flex gap-2 rounded-lg"
        >
          <Upload size={16} /> Upload
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Preview</th>
              <th>Caption</th>
              <th>Section</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {mediaList.map((m, i) => (
              <tr key={m.id} className="border-t hover:bg-gray-50">
                <td>{i + 1}</td>

                <td>
                  <img
                    src={`${BASE_URL}${m.file_url}`}
                    className="w-16 h-12 object-cover rounded cursor-pointer"
                    onClick={() => setSelectedMedia(m)}
                  />
                </td>

                <td>{m.caption || "-"}</td>
                <td>{m.section || "-"}</td>
                <td>{m.category || "-"}</td>

                <td className="flex gap-2 justify-center py-2">
                  <Eye onClick={() => setSelectedMedia(m)} className="cursor-pointer" />
                  <Pencil onClick={() => openModal(m)} className="cursor-pointer" />
                  <Trash2 onClick={() => handleDelete(m.id)} className="cursor-pointer text-red-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* IMAGE VIEW */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
          onClick={() => setSelectedMedia(null)}
        >
          <button className="absolute top-5 right-5 text-white">
            <X size={20} />
          </button>

          <img
            src={`${BASE_URL}${selectedMedia.file_url}`}
            className="max-h-[80vh] rounded-lg"
          />
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-96 rounded-xl">

            <div className="flex justify-between mb-3">
              <h2>{editingItem ? "Edit" : "Upload"} Media</h2>
              <X onClick={closeModal} className="cursor-pointer" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">

              {!editingItem && (
                <input
                  type="file"
                  required
                  onChange={(e) =>
                    setFile(e.target.files?.[0] || null)
                  }
                />
              )}

              <input
                placeholder="Caption (Name-Role)"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border p-2 rounded"
              />

              {/* DROPDOWN */}
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "gallery" | "committee")
                }
                className="w-full border p-2 rounded"
              >
                <option value="gallery">IQAC Gallery</option>
                <option value="committee">IQAC Committee</option>
              </select>

              <button className="bg-indigo-600 text-white w-full py-2 rounded">
                {submitting ? "Saving..." : "Save"}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}