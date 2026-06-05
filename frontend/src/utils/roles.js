import { GraduationCap, BookOpen, Building2, Users } from "lucide-react";

export const ROLES = {
  student: {
    key: "student",
    label: "Student",
    icon: GraduationCap,
    badge: "bg-primary/10 text-primary",
    dot: "bg-primary",
  },
  teacher: {
    key: "teacher",
    label: "Teacher",
    icon: BookOpen,
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  principal: {
    key: "principal",
    label: "Principal",
    icon: Building2,
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  parent: {
    key: "parent",
    label: "Parent",
    icon: Users,
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
  },
};
