import Logo from "@/components/Logo";
import CardWrapper from "@/components/forms/card-wrapper";
import AuthChange from "./form-change-pass";

const Login = () => {
  return (
    <div className="flex flex-col flex-wrap content-center justify-center w-full min-h-screen">
      <Logo />
      <CardWrapper
        title="Crie uma nova senha"
        description=""
        footer={{
          title: "Lembrou sua senha? Faça login",
          href: "/login",
        }}
      >
        <AuthChange />
      </CardWrapper>
    </div>
  );
};
export default Login;
