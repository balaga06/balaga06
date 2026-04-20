import { ArrowRight, BarChart3, FileText, Users, GraduationCap, Globe, BookOpen, Bell, } from "lucide-react";
const iconMap = {
    ArrowRight,
    BarChart3,
    FileText,
    Users,
    GraduationCap,
    Globe,
    BookOpen,
    Bell,
};
export const getIcon = (name) => {
    if (!name)
        return null;
    return iconMap[name] || null;
};
