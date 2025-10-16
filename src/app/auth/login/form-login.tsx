"use client";
import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResponseType } from "@/_domain/shared/types";

import { LoadingButton } from "@/components/ui/loading-button";

import PasswordInput from "@/components/forms/PasswordInput";
import TextInput from "@/components/forms/TextInput";
import FormMessage from "@/components/forms/form-message";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AuthForget from "../mudar-senha/auth-forget-pass";
import AuthToken from "../reenviar-token/form-resend-token";
import AuthChangeEmail from "../mudar-email/form-change-email";
import { cn } from "@/lib/utils";
import { AuthLoginSchema, authLoginType } from "@/_domain/auth/auth.schema";
import { authLoginAction } from "@/_domain/auth/auth.actions";
import { useSession } from "@/contexts/SessionContext";
import { useRouter } from "next/navigation";

interface AuthLoginProps {
  variant?: "default" | "light";
}
const AuthLogin = ({ variant }: AuthLoginProps) => {
  const { updateSession } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<ResponseType["message"] | null>(null);

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resendCodeOpen, setResendCodeOpen] = useState(false);
  const [wrongEmailOpen, setWrongEmailOpen] = useState(false);

  const { handleSubmit, control } = useForm<authLoginType>({
    resolver: zodResolver(AuthLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    (data: authLoginType) => {
      setMessage(null);
      startTransition(async () => {
        const auth = await authLoginAction(data);

        if (auth?.message) {
          setMessage({
            type: auth.message.type,
            content: auth.message.content,
          });
        }

        // TODO: mudar para uma maneira mais segura
        if (auth?.isSuccess) {
          updateSession();
          router.replace("/perfil");
        }
      });
    },
    [updateSession, router]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <TextInput
            control={control}
            name="email"
            label="Informe seu e-mail"
            placeholder="Informe seu e-mail"
          />
          <PasswordInput control={control} name="password" label="Senha" />

          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className={cn(variant === "light" && "text-blue-100")}
                >
                  Problemas para logar?
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setForgotPasswordOpen(true)}>
                  Esqueci minha senha
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setResendCodeOpen(true)}>
                  Reenviar código de verificação
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setWrongEmailOpen(true)}>
                  Cadastrei o email errado
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <LoadingButton loading={isPending} type="submit">
            Entrar
          </LoadingButton>

          {message && <FormMessage message={message} />}
        </div>
      </form>

      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Esqueci minha senha</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <AuthForget />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={resendCodeOpen} onOpenChange={setResendCodeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reenviar código de verificação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <AuthToken />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={wrongEmailOpen} onOpenChange={setWrongEmailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrei o email errado</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <AuthChangeEmail />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthLogin;
