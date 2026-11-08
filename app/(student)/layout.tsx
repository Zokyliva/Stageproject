// app/(student)/layout.tsx   [NOUVEAU]
import type { ReactNode } from "react";
import { RoleShell } from "@/components/RoleShell";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return <RoleShell role="STUDENT">{children}</RoleShell>;
}