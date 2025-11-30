"use client";
import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import PasswordInput from "@/components/forms/PasswordInput";
import FormMessage from "@/components/forms/form-message";
import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  UpdatePasswordSchema,
  updatePasswordType,
} from "@/_domain/user/user.schema";
import { userUpdatePassAction } from "@/_domain/user/user.actions";
import { ResponseType } from "@/_domain/shared/types";

const AuthChange = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState<ResponseType["message"] | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const { handleSubmit, control } = useForm<updatePasswordType>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      token: token,
      password: "",
      repeat: "",
    },
  });

  const onSubmit = useCallback((data: updatePasswordType) => {
    setMessage(null);
    startTransition(async () => {
      const submit = await userUpdatePassAction(data);

      if (submit?.message) {
        setMessage({
          type: submit.message.type,
          content: submit.message.content,
        });
      }

      if (submit?.isSuccess) {
        setIsSuccess(true);
      }
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {!isSuccess && (
          <>
            <PasswordInput
              name="password"
              label="Crie uma nova senha"
              control={control}
              helper
            />

            <PasswordInput
              name="repeat"
              label="Repita a nova senha"
              control={control}
            />

            <LoadingButton loading={isPending} type="submit">
              Entrar
            </LoadingButton>
          </>
        )}

        {message && <FormMessage message={message} />}

        {isSuccess && (
          <Button asChild className="w-full">
            <Link href="/auth/login">Faça Login</Link>
          </Button>
        )}
      </div>
    </form>
  );
};

export default AuthChange;
