import type React from "react";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import SidebarLinks from "./sidebar-links";

import Logout from "./logout";
import { SessionProvider } from "@/contexts/SessionContext";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

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
    <SessionProvider>
      <div className=" bg-black">
        <div className="flex justify-center items-center  mx-auto w-full max-w-4xl  p-5 flex-row md:flex gap-6">
          <h1 className="text-center text-4xl p-4 ps-0 font-mono">
            &lt;Admin /&gt;
          </h1>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer ml-auto"
              asChild
            >
              <Link href="/" title="Home">
                {" "}
                <ExternalLink />{" "}
              </Link>
            </Button>
            <Logout />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl  p-5 flex-row md:flex gap-6">
        <SidebarLinks />

        <div className="w-full">{children}</div>
      </div>
    </SessionProvider>
  );
}
