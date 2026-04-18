import {
  ArrowRight,
  BarChart3,
  FileText,
  Users,
  GraduationCap,
  Globe,
  BookOpen,
  Bell,
} from "lucide-react";

const iconMap: Record<string, any> = {
  ArrowRight,
  BarChart3,
  FileText,
  Users,
  GraduationCap,
  Globe,
  BookOpen,
  Bell,
};

export const getIcon = (name?: string) => {
  if (!name) return null;
  return iconMap[name] || null;
};