"use client";
import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "@/components/forms/TextInput";
import { LoadingButton } from "@/components/ui/loading-button";
import FormMessage from "@/components/forms/form-message";

import { responseType } from "@/_domain/shared/types";

import {
  AuthResendTokenSchema,
  authResendTokenType,
} from "@/_domain/auth/auth.schema";
import { authResendToken } from "@/_domain/auth/auth.actions";

const AuthToken = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const [message, setMessage] = useState<responseType["message"] | null>(null);

  const { handleSubmit, control, reset } = useForm<authResendTokenType>({
    resolver: zodResolver(AuthResendTokenSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    (data: authResendTokenType) => {
      setMessage(null);
      startTransition(async () => {
        const submit = await authResendToken(data);

        if (submit.message) {
          setMessage(submit.message);
        }

        if (submit.isSuccess) {
          setIsSuccess(true);
          reset({ email: "" });
        }
      });
    },
    [reset]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {!isSuccess && (
          <>
            <TextInput
              name="email"
              control={control}
              label="Informe seu e-mail"
              placeholder="Informe o e-mail para reenviar o link de verificação da conta"
            />

            <LoadingButton loading={isPending} type="submit">
              Reenviar link de verificação
            </LoadingButton>
          </>
        )}

        {message && <FormMessage message={message} />}
      </div>
    </form>
  );
};

export default AuthToken;
