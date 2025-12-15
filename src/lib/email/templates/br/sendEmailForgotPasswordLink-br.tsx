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
      <Text>Olá, {name}</Text>
      <Text>Você solicitou a redefinição de sua senha.</Text>
      <Text>para continuar clique no botão abaixo e crie uma nova senha</Text>
      <Button
        href={token}
        className="p-4 text-center bg-highlight text-primary rounded w-full box-border"
      >
        Criar nova senha
      </Button>
      <Text>Se você não fez esta solicitação, ignore este e-mail.</Text>
    </EmailLayout>
  );
};

// Função para enviar o e-mail
export async function sendEmailForgotPasswordLinkBR(
  email: string,
  props: TemplateProps
) {
  // Gera o HTML a partir do componente React usando React Email
  const emailHtml = await render(<Template {...props} />);

  // Configura o Nodemailer
  await sendEmail({
    to: email,
    subject: "Redefinição de senha",
    html: emailHtml,
  });
}
