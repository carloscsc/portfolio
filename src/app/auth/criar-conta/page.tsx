import CardWrapper from "@/components/forms/card-wrapper";
import Logo from "@/components/Logo";
import AuthRegister from "./form-register-user";

const Register = () => (
  <div className="flex flex-col flex-wrap content-center justify-center w-full min-h-screen py-16">
    <Logo />
    <CardWrapper
      title="Crie sua conta"
      description="	Preencha os dados abaixo para criar uma nova conta"
      footer={{
        title: "Já tem uma conta? Faça login",
        href: "/login",
      }}
    >
      <AuthRegister />
    </CardWrapper>
  </div>
);

export default Register;
