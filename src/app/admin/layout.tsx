import type React from "react";
import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import SidebarLinks from "./sidebar-links";

export const metadata: Metadata = {
  title: "Admin - Portfolio",
  description: "Admin panel for portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row justify-between items-center mx-auto w-full max-w-4xl">
        <h1 className="text-center text-4xl p-4 ps-0">&lt;Admin /&gt;</h1>
        <LogOut className="cursor-pointer" />
      </div>

      <div className="mx-auto w-full max-w-4xl border border-white/10 p-5 flex-row md:flex gap-6">
        <SidebarLinks />

        <div className="w-full">{children}</div>
      </div>

      <footer className="mt-5 mb-4 text-center text-sm text-gray-500">
        {new Date().getFullYear()}&copy; Carlos Sabo Cantanzaro - Todos os
        direitos reservados.
      </footer>
    </>
  );
}
