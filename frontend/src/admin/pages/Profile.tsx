import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  Camera,
  X,
} from "lucide-react";

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@jntuk.edu.in",
    phone: "",
  });

  /* ================= IMAGE HANDLERS ================= */
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  /* ================= INPUT HANDLER ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-1">
        My Profile
      </h1>
      <p className="text-slate-500 mb-8">
        Manage your personal information
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-6"
      >
        {/* ================= PROFILE IMAGE ================= */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-slate-100 border flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-slate-400" />
              )}
            </div>

            {/* Upload */}
            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </label>

            {/* Remove image */}
            {profileImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-1 -right-1 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Profile Photo
            </h2>
            <p className="text-sm text-slate-500">
              Upload or remove your profile image
            </p>
          </div>
        </div>

        {/* ================= FORM FIELDS ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">
              Full Name
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 h-10 border rounded-md"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                value={formData.email}
                disabled
                className="w-full pl-9 h-10 border rounded-md bg-slate-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium">
              Phone
            </label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 h-10 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" type="reset">
            Cancel
          </Button>
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
