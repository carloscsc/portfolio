"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[31px] w-[61px]" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <SwitchPrimitives.Root
      checked={isDark}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      className={cn(
        "relative inline-flex h-[31px] w-[61px] shrink-0 cursor-pointer items-center rounded-full bg-toggle ring-1 ring-border"
      )}
    >
      <Moon
        className="absolute left-1.5 z-10 h-[18px] w-[18px] text-primary"
        strokeWidth={1.5}
      />

      {/* <span className="font-mono absolute left-3 z-10  text-primary">0</span> */}

      <Sun
        className="absolute right-1.5 z-10 h-[18px] w-[18px] text-primary"
        strokeWidth={1.5}
      />

      {/* <span className="font-mono absolute right-3 z-10  text-primary">1</span> */}
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none z-20 block h-[27px] w-[27px] rounded-full bg-white shadow-lg ring-1 ring-border transition-transform duration-300 ease-in-out",
          "data-[state=unchecked]:translate-x-0.5",
          "data-[state=checked]:translate-x-8"
        )}
      />
    </SwitchPrimitives.Root>
  );
};

ModeToggle.displayName = "ModeToggle";
