"use client";
import { logout } from "@/_domain/auth/auth.actions";
import { Button } from "@/components/ui/button";
import { useSession } from "@/contexts/SessionContext";
import { LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const { updateSession } = useSession();

  async function handleLogout() {
    await logout();
    updateSession();
    router.replace("/");
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogout}
      className="cursor-pointer ml-auto"
    >
      <LogOut />
    </Button>
  );
};
export default Logout;
