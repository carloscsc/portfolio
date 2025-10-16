import { render, Text, Button } from "@react-email/components";

import { EmailLayout } from "./EmailLayout";
import { sendEmail } from "./sender";

interface TemplateProps {
  name: string;
  token: string;
}

const Template: React.FC<TemplateProps> = ({ name, token }) => {
  return (
    <EmailLayout>
      <Text>Olá, {name}</Text>
      <Text>Você recebeu acesso administrativo ao nosso sistema</Text>
      <Text>Para acessar sua conta, clique no link abaixo:</Text>
      <Button
        href={token}
        style={{
          backgroundColor: "#0021b8",
          color: "#ffffff",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        ACESSAR MINHA CONTA
      </Button>
    </EmailLayout>
  );
};

// Função para enviar o e-mail
export async function sendEmailAdminAccess(
  email: string,
  props: TemplateProps
) {
  // Gera o HTML a partir do componente React usando React Email
  const emailHtml = await render(<Template {...props} />);

  // Configura o Nodemailer
  await sendEmail({
    to: email,
    subject: "Acesso de Administrador",
    html: emailHtml,
  });
}
