import { useState } from "react";
import {
  Save,
  Lock,
  Bell,
  University,
  UserCog,
  KeyRound,
  CheckCircle,
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    universityName: "Jawaharlal Nehru Technological University Kakinada",
    shortName: "JNTUK",
    adminEmail: "admin@jntuk.edu.in",
    contactNumber: "+91 98765 43210",
    twoFactorAuth: true,
    emailNotifications: true,
    systemMaintenance: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  const handlePasswordChange = (
    key: string,
    value: string
  ) => {
    setPasswords({ ...passwords, [key]: value });
  };

  const handlePasswordSave = () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      alert("Please fill all password fields");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // ✅ Backend API call later

    setPasswordSaved(true);

    // Reset fields
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Auto close after success
    setTimeout(() => {
      setPasswordSaved(false);
      setShowPassword(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Settings
        </h1>
        <p className="text-sm text-slate-500">
          Manage system, security, and university configuration
        </p>
      </div>

      {/* ================= UNIVERSITY ================= */}
      <Section
        title="University Information"
        icon={<University className="w-5 h-5 text-indigo-600" />}
      >
        <Field
          label="University Name"
          value={settings.universityName}
          onChange={(e) =>
            handleChange("universityName", e.target.value)
          }
        />
        <Field
          label="Short Name"
          value={settings.shortName}
          onChange={(e) =>
            handleChange("shortName", e.target.value)
          }
        />
        <Field
          label="Contact Number"
          value={settings.contactNumber}
          onChange={(e) =>
            handleChange("contactNumber", e.target.value)
          }
        />
      </Section>

      {/* ================= ADMIN ================= */}
      <Section
        title="Administrator"
        icon={<UserCog className="w-5 h-5 text-indigo-600" />}
      >
        <Field
          label="Admin Email"
          value={settings.adminEmail}
          type="email"
          onChange={(e) =>
            handleChange("adminEmail", e.target.value)
          }
        />
      </Section>

      {/* ================= SECURITY ================= */}
      <Section
        title="Security"
        icon={<Lock className="w-5 h-5 text-indigo-600" />}
      >
        {/* Change Password Toggle */}
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center gap-2 text-indigo-600 text-sm font-medium hover:underline col-span-full"
        >
          <KeyRound className="w-4 h-4" />
          Change Password
        </button>

        {/* Password Fields */}
        {showPassword && (
          <div className="col-span-full space-y-4 mt-2">
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="Current Password"
                type="password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  handlePasswordChange(
                    "currentPassword",
                    e.target.value
                  )
                }
              />
              <Field
                label="New Password"
                type="password"
                value={passwords.newPassword}
                onChange={(e) =>
                  handlePasswordChange(
                    "newPassword",
                    e.target.value
                  )
                }
              />
              <Field
                label="Confirm New Password"
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange(
                    "confirmPassword",
                    e.target.value
                  )
                }
              />
            </div>

            {/* Save Password Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={handlePasswordSave}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                Save Password
              </button>

              {passwordSaved && (
                <span className="flex items-center gap-2 text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Password saved successfully
                </span>
              )}
            </div>
          </div>
        )}
      </Section>

      {/* ================= NOTIFICATIONS ================= */}
      <Section
        title="Notifications"
        icon={<Bell className="w-5 h-5 text-indigo-600" />}
      >
        <Toggle
          label="Email Notifications"
          checked={settings.emailNotifications}
          onChange={(v) =>
            handleChange("emailNotifications", v)
          }
        />
      </Section>

      {/* ================= SAVE SETTINGS ================= */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ================= REUSABLE ================= */

function Section({
  title,
  icon,
  children,
}: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-3 border-b pb-3">
        {icon}
        <h2 className="text-lg font-semibold text-slate-800">
          {title}
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }: any) {
  return (
    <div className="flex items-center justify-between col-span-full">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full px-1 transition ${
          checked ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`block w-4 h-4 bg-white rounded-full transition ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
