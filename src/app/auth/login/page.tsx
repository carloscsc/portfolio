import AuthLogin from "./form-login";

import CardWrapper from "@/components/forms/card-wrapper";

const Login = async () => {
  return (
    <div className="flex flex-col flex-wrap content-center justify-center w-full min-h-screen">
      &lt;Admin /&gt;
      <CardWrapper
        title="You Shall Not Pass!"
        description="Informe seu e-mail e senha para entrar"
        footer={{
          title: "Ainda não tem uma conta? Crie sua conta",
          href: "/criar-conta",
        }}
      >
        <div className="space-y-4">
          <AuthLogin />
        </div>
      </CardWrapper>
    </div>
  );
};
export default Login;
