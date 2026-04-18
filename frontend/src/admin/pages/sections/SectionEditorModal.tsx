import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  updateSection,
  type PageSection,
} from "@/admin/services/pageSection.api";

/* ================= FORM IMPORTS ================= */
import HeroSectionForm from "./forms/HeroSectionForm";
import IntroSectionForm from "./forms/IntroSectionForm";
import FeaturesSectionForm from "./forms/FeaturesSectionForm";
import TopBarSectionForm from "./forms/TopBarSectionForm";
import FooterSectionForm from "./forms/FooterSectionForm";
import ContactInfoSectionForm from "./forms/ContactInfoSectionForm";
import GenericJsonForm from "./forms/GenericJsonForm";

/* ================= FORM MAP ================= */
const formMap: Record<
  string,
  React.ComponentType<{ content: any; onChange: (c: any) => void }>
> = {
  hero: HeroSectionForm,
  intro: IntroSectionForm,
  features: FeaturesSectionForm,
  topbar: TopBarSectionForm,
  footer: FooterSectionForm,
  contact_info: ContactInfoSectionForm,
};

/* ================= TYPES ================= */
interface Props {
  section: PageSection;
  onClose: () => void;
  onSaved: () => void;
}

/* ================= COMPONENT ================= */
export default function SectionEditorModal({
  section,
  onClose,
  onSaved,
}: Props) {
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState<Record<string, any>>(
    section.content || {}
  );
  const [isActive, setIsActive] = useState(section.is_active);
  const [submitting, setSubmitting] = useState(false);

  /* ================= DYNAMIC FORM ================= */
  const FormComponent =
    formMap[section.section_key] || GenericJsonForm;

  /* ================= SAVE ================= */
  const handleSave = async () => {
    setSubmitting(true);

    try {
      await updateSection(section.id, {
        title,
        content,
        is_active: isActive,
      });

      toast.success("Section updated successfully");
      onSaved(); // refresh parent
      onClose();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update section"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start bg-black/40 backdrop-blur-sm overflow-y-auto py-10">

      <div className="w-full max-w-3xl mx-4 bg-white rounded-2xl shadow-xl border">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10 rounded-t-2xl">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Edit Section
            </h2>
            <p className="text-sm text-slate-500">
              {section.page_group} / {section.section_key}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* TITLE + ACTIVE */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* TITLE */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Display Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* ACTIVE TOGGLE */}
            <div className="flex items-end">
              <div className="flex items-center gap-3">

                <span className="text-sm text-slate-700">
                  Section Active
                </span>

                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                    isActive ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                      isActive ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t" />

          {/* ================= DYNAMIC FORM ================= */}
          <div className="space-y-4">
            <FormComponent
              content={content}
              onChange={setContent}
            />
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-slate-50 rounded-b-2xl">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={submitting}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50"
          >
            {submitting && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}