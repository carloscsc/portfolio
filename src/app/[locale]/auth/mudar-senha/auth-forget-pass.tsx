"use client";
import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "@/components/forms/TextInput";
import { LoadingButton } from "@/components/ui/loading-button";
import FormMessage from "@/components/forms/form-message";

import {
  AuthForgetPassFormSchema,
  authForgetPassFormType,
} from "@/_domain/auth/auth.schema";
import { authForgetpassAction } from "@/_domain/auth/auth.actions";
import { ResponseType } from "@/_domain/shared/types";

const AuthForget = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<ResponseType["message"] | null>(null);

  const { handleSubmit, control, reset } = useForm<authForgetPassFormType>({
    resolver: zodResolver(AuthForgetPassFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    (data: authForgetPassFormType) => {
      setMessage(null);
      startTransition(async () => {
        const submit = await authForgetpassAction(data);
        reset({ email: "" });

        if (submit?.message) {
          setMessage(submit.message);
        }

        if (submit?.isSuccess) {
          setIsSuccess(true);
        }
      });
    },
    [reset]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {!isSuccess ? (
          <>
            <TextInput
              name="email"
              control={control}
              label="Informe seu e-mail"
              placeholder="Informe o e-mail para recuperar a conta"
            />

            <LoadingButton loading={isPending} type="submit">
              Recuperar senha
            </LoadingButton>
          </>
        ) : (
          message && <FormMessage message={message} />
        )}
      </div>
    </form>
  );
};

export default AuthForget;
