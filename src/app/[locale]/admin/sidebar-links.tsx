"use client";

import { cn } from "@/lib/utils";
import { BriefcaseIcon, PenSquareIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const MenuLink = ({
  href,
  icon,
  text,
}: {
  href: string;
  icon: ReactNode;
  text: string;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "p-2 mb-2 w-full rounded hover:bg-black flex justify-start items-center gap-2",
          "[&>svg]:w-4 [&>svg]:h-4",
          isActive ? "bg-black" : ""
        )}
      >
        {icon} {text}
      </Link>
    </li>
  );
};

const sidebarLinks = () => {
  return (
    <nav className="bg-[#2b2b2b] w-full md:w-[200px]  md:min-h-screen border rounded-sm mb-5 md:mb-0">
      <ul className="rounded-md overflow-hidden p-2">
        <MenuLink href="/admin" icon={<PenSquareIcon />} text="Perfil" />
        <MenuLink
          href="/admin/projects"
          icon={<BriefcaseIcon />}
          text="Projetos"
        />
      </ul>
    </nav>
  );
};

export default sidebarLinks;
