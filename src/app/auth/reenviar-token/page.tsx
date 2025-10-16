import Logo from "@/components/Logo";
import CardWrapper from "@/components/forms/card-wrapper";

import AuthToken from "./form-resend-token";

const Login = () => {
  return (
    <div className="flex flex-col flex-wrap content-center justify-center w-full min-h-screen">
      <Logo />
      <CardWrapper
        title="Reenviar token para e-mail"
        description=""
        footer={{
          title: "Ou Faça login",
          href: "/login",
        }}
      >
        <AuthToken />
      </CardWrapper>
    </div>
  );
};
export default Login;
