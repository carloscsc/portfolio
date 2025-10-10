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
      <div className=" bg-black">
        <div className="flex justify-center items-center  mx-auto w-full max-w-4xl  p-5 flex-row md:flex gap-6">
          <h1 className="text-center text-4xl p-4 ps-0 font-mono">
            &lt;Admin /&gt;
          </h1>
          <LogOut className="cursor-pointer ml-auto" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl  p-5 flex-row md:flex gap-6">
        <SidebarLinks />

        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
