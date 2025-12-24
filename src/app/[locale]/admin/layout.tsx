import type React from "react";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import SidebarLinks from "./sidebar-links";

import Logout from "./logout";
import { SessionProvider } from "@/contexts/SessionContext";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ModeToggle } from "@/components/ui/custom/theme-toggle";

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
      <div className="bg-accent">
        <div className="flex justify-center items-center mx-auto container p-5 flex-row md:flex gap-6">
          <h1 className="text-center text-4xl p-4 ps-0 font-mono">
            &lt;Admin /&gt;
          </h1>
          <div className="ml-auto flex items-center gap-2">
            {/* <LanguageSwitcher variant="desktop" /> */}
            <ModeToggle />
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

      <div className="mx-auto container p-5 grid grid-cols-1 md:grid-cols-5 gap-6 bg-background">
        <SidebarLinks />
        <div className="col-span-4">{children}</div>
      </div>
    </SessionProvider>
  );
}
