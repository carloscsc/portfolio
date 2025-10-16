import AuthLogin from "./form-login";

import CardWrapper from "@/components/forms/card-wrapper";

const Login = async () => {
  return (
    <div className="flex flex-col flex-wrap content-center justify-center w-full min-h-screen border">
      <AuthLogin />
    </div>
  );
};
export default Login;
