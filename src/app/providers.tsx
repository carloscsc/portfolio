"use client";
import { ZodProvider } from "@/lib/zod-providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ZodProvider>{children}</ZodProvider>
    </QueryClientProvider>
  );
};

export default Providers;
