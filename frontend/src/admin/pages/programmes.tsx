import { useEffect, useState, useMemo } from "react";
import { Pencil, Trash2, Plus, Loader2, X } from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import toast from "react-hot-toast";

import {
  getProgrammes,
  createProgramme,
  updateProgramme,
  deleteProgramme,
  reorderProgrammes,
  type Programme,
} from "@/admin/services/programmes.api";

/* ================= TYPES ================= */
type ProgrammeForm = {
  name: string;
  degree: string;
  duration: string;
  department: string;
  branch_code: string;
  is_active: boolean;
};

export default function Programmes() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [activeTab, setActiveTab] = useState<"UG" | "PG">("UG");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [form, setForm] = useState<ProgrammeForm>({
    name: "",
    degree: "",
    duration: "",
    department: "",
    branch_code: "",
    is_active: true,
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  /* ================= FETCH ================= */
  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const data = await getProgrammes(activeTab);
      setProgrammes(data || []);
    } catch {
      toast.error("Failed to fetch programmes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammes();
  }, [activeTab]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name required");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...form,
        type: activeTab,
        is_active: !!form.is_active, // ✅ FIX
      };

      if (editingId) {
        await updateProgramme(editingId, payload);
        toast.success("Updated successfully");
      } else {
        await createProgramme(payload);
        toast.success("Added successfully");
      }

      resetForm();
      fetchProgrammes();
    } catch {
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm({
      name: "",
      degree: "",
      duration: "",
      department: "",
      branch_code: "",
      is_active: true,
    });
    setEditingId(null);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this programme?")) return;

    try {
      await deleteProgramme(id);
      toast.success("Deleted");
      fetchProgrammes();
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (p: Programme) => {
    setForm({
      name: p.name,
      degree: p.degree,
      duration: p.duration,
      department: p.department || "",
      branch_code: p.branch_code || "",
      is_active: p.is_active, // ✅ FIX
    });

    setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    return programmes.filter((p) => p.type === activeTab);
  }, [programmes, activeTab]);

  /* ================= PAGINATION ================= */
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  /* ================= DRAG ================= */
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(filtered); // ✅ FIX

    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    // merge back to full list
    const updated = programmes.map((p) => {
      const found = items.find((i) => i.id === p.id);
      return found ? found : p;
    });

    setProgrammes(updated);

    try {
      await reorderProgrammes(
        items.map((item, index) => ({
          id: item.id,
          order_index: index,
        }))
      );
    } catch {
      toast.error("Reorder failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center min-h-[50vh]">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      <h1 className="text-2xl font-semibold">Programmes</h1>

      {/* TABS */}
      <div className="flex gap-2">
        {(["UG", "PG"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setPage(1);
            }}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-7 gap-3">

        <input placeholder="Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="border p-2"/>

        <input placeholder="Degree"
          value={form.degree}
          onChange={(e)=>setForm({...form,degree:e.target.value})}
          className="border p-2"/>

        <input placeholder="Duration"
          value={form.duration}
          onChange={(e)=>setForm({...form,duration:e.target.value})}
          className="border p-2"/>

        <input placeholder="Department"
          value={form.department}
          onChange={(e)=>setForm({...form,department:e.target.value})}
          className="border p-2"/>

        <input placeholder="Branch Code"
          value={form.branch_code}
          onChange={(e)=>setForm({...form,branch_code:e.target.value})}
          className="border p-2"/>

        <select
          value={form.is_active ? "Active" : "Inactive"}
          onChange={(e)=>
            setForm({
              ...form,
              is_active: e.target.value === "Active",
            })
          }
          className="border p-2"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="flex gap-2">
          <button className="bg-indigo-600 text-white px-3">
            {submitting ? <Loader2 className="animate-spin"/> : <Plus size={16}/>}
          </button>

          {editingId && (
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-3">
              <X size={16}/>
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="programmes">
          {(provided) => (
            <table ref={provided.innerRef} {...provided.droppableProps} className="w-full border text-sm">

              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Degree</th>
                  <th>Duration</th>
                  <th>Department</th>
                  <th>Branch Code</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginated.map((p, index) => (
                  <Draggable key={p.id} draggableId={String(p.id)} index={index}>
                    {(provided) => (
                      <tr ref={provided.innerRef} {...provided.draggableProps} className="border-t text-center">
                        <td {...provided.dragHandleProps}>☰</td>
                        <td>{p.name}</td>
                        <td>{p.degree}</td>
                        <td>{p.duration}</td>
                        <td>{p.department}</td>
                        <td>{p.branch_code || "-"}</td>

                        <td>
                          {p.is_active ? (
                            <span className="text-green-600">Active</span>
                          ) : (
                            <span className="text-red-500">Inactive</span>
                          )}
                        </td>

                        <td className="flex gap-2 justify-center">
                          <Pencil onClick={()=>handleEdit(p)} className="cursor-pointer text-blue-600"/>
                          <Trash2 onClick={()=>handleDelete(p.id)} className="cursor-pointer text-red-600"/>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}

                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-4 text-gray-400 text-center">
                      No programmes found
                    </td>
                  </tr>
                )}

                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border ${
              page === i + 1 ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
}