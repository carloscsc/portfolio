import Logo from "@/components/Logo";
import CardWrapper from "@/components/forms/card-wrapper";
import AuthChangeEmail from "./form-change-email";

const Login = () => {
  return (
    <div className="flex flex-col flex-wrap content-center justify-center w-full min-h-screen">
      <Logo />
      <CardWrapper
        title="Mude o e-mail cadastrado"
        description=""
        footer={{
          title: "Lembrou o e-mail? Faça login",
          href: "/login",
        }}
      >
        <AuthChangeEmail />
      </CardWrapper>
    </div>
  );
};
export default Login;
