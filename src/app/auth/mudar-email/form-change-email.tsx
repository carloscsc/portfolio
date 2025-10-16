"use client";
import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/ui/loading-button";

import PasswordInput from "@/components/forms/PasswordInput";
import TextInput from "@/components/forms/TextInput";
import FormMessage from "@/components/forms/form-message";

import {
  UserChangeEmailSchema,
  userChangeEmailType,
} from "@/_domain/user/user.schema";
import { userChangeEmail } from "@/_domain/user/user.actions";
import { responseType } from "@/_domain/shared/types";

const AuthChangeEmail = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<responseType["message"] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { handleSubmit, control } = useForm<userChangeEmailType>({
    resolver: zodResolver(UserChangeEmailSchema),
    defaultValues: {
      email: "",
      password: "",
      cpf: "",
    },
  });

  const onSubmit = useCallback((data: userChangeEmailType) => {
    setMessage(null);
    startTransition(async () => {
      const submit = await userChangeEmail(data);

      if (submit.message) {
        setMessage(submit.message);
      }

      if (submit.isSuccess) {
        setIsSuccess(true);
      }
    });
  }, []);

  return (
    <div>
      {!isSuccess && (
        <>
          <p className="leading-7 not-first:mt-6 mb-3">
            Para cadastrar um novo e-mail, informe o seu CPF e a senha
            cadastrada.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <TextInput
                control={control}
                name="cpf"
                label="CPF"
                mask="999.999.999-99"
                placeholder="Informe o CPF do usuário"
              />

              <PasswordInput
                control={control}
                name="password"
                label="Senha *"
              />

              <TextInput
                control={control}
                name="email"
                label="Informe o novo e-mail"
                placeholder="Informe seu melhor e-mail"
              />

              <LoadingButton loading={isPending} type="submit">
                Cadastrar novo e-mail
              </LoadingButton>
            </div>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            <strong>* Caso não saiba sua senha:</strong> entre em contato com
            nosso atendimento, pelo e-mail: atendimento01@metropolitanafm.com.br
            ou pelo{" "}
            <a
              className="underline-offset-4 hover:underline"
              href="https://api.whatsapp.com/send?phone=5511911119850"
            >
              WhatsApp: (11) 91111-9850
            </a>
          </p>
        </>
      )}

      <div className="not-first:mt-4">
        {message && <FormMessage message={message} />}
      </div>
    </div>
  );
};

export default AuthChangeEmail;
