import { render, Text, Button } from "@react-email/components";

import { EmailLayout } from "../EmailLayout";
import { sendEmail } from "../../sender";

interface TemplateProps {
  name: string;
  token: string;
}

const Template: React.FC<TemplateProps> = ({ name, token }) => {
  return (
    <EmailLayout>
      <Text>Hello, {name}</Text>
      <Text>You requested to reset your password.</Text>
      <Text>To continue, click the button below and create a new password</Text>
      <Button
        href={token}
        className="p-4 text-center bg-highlight text-primary rounded w-full box-border"
      >
        Create new password
      </Button>
      <Text>
        If you didn&rsquo;t make this request, please ignore this email.
      </Text>
    </EmailLayout>
  );
};

// Função para enviar o e-mail
export async function sendEmailForgotPasswordLinkEN(
  email: string,
  props: TemplateProps
) {
  // Gera o HTML a partir do componente React usando React Email
  const emailHtml = await render(<Template {...props} />);

  // Configura o Nodemailer
  await sendEmail({
    to: email,
    subject: "Password Reset",
    html: emailHtml,
  });
}
