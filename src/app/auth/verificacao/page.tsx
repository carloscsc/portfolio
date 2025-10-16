"use server";
import { userValidate } from "@/_domain/user/user.actions";
import Logo from "@/components/Logo";
import CardWrapper from "@/components/forms/card-wrapper";
import { notFound } from "next/navigation";
import AuthLogin from "../login/form-login";
import FormMessage from "@/components/forms/form-message";

import AuthToken from "../reenviar-token/form-resend-token";

const Login = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { token } = await searchParams;

  if (!token) {
    notFound();
  }

  const validate = await userValidate(token);

  return (
    <div className="flex flex-col flex-wrap content-center justify-center w-full min-h-screen">
      <Logo />
      <CardWrapper
        title="Verificação da conta"
        description=""
        footer={{
          title: "Ainda não tem uma conta? Crie sua conta",
          href: "/criar-conta",
        }}
      >
        {validate.isSuccess ? (
          <>
            <FormMessage
              message={{
                type: "success",
                content: "Usuário verificado com sucesso! Faça login!",
              }}
              className="mb-4"
            />
            <AuthLogin />
          </>
        ) : (
          <>
            <FormMessage
              message={{
                type: "error",
                content:
                  "Erro ao verificar usuário, reenvie o link de verificação para seu e-mail",
              }}
              className="mb-4"
            />
            <AuthToken />
          </>
        )}
      </CardWrapper>
    </div>
  );
};
export default Login;
