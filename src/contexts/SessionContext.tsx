"use client";

import { ResponseType } from "@/_domain/shared/types";
import { userDTO } from "@/_domain/user/user.actions";

import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { createContext, ReactNode, useContext } from "react";

interface SessionContextProps {
  session: ResponseType["user"];
  updateSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession deve ser usado dentro de SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["session"],
    retry: false,
    queryFn: async (): Promise<ResponseType | null> => {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
      );
      return await request.json();
    },
    placeholderData: keepPreviousData,
  });

  const updateSessionMutation = useMutation({
    mutationFn: async (): Promise<ResponseType | null> => {
      return await userDTO();
    },
    onSuccess: (updatedSession) => {
      queryClient.setQueryData(["session"], updatedSession);
    },
  });

  const updateSession = async () => {
    await updateSessionMutation.mutateAsync();
  };

  return (
    <SessionContext.Provider
      value={{
        session: data?.user,
        updateSession,
      }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="text-2xl font-bold  flex items-center gap-2">
            <Loader2 className="animate-spin" /> Aguarde
            <span className="animate-bounce duration-600">.</span>
            <span className="animate-bounce duration-700">.</span>
            <span className="animate-bounce duration-1000">.</span>
          </div>
        </div>
      ) : (
        children
      )}
    </SessionContext.Provider>
  );
};
