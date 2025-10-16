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
      <Text>Vamos finalizar seu cadastro?</Text>
      <Text>Para confirmar sua conta, clique no link abaixo</Text>
      <Button
        href={token}
        style={{
          backgroundColor: "#0021b8",
          color: "#ffffff",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        Verificar minha conta
      </Button>
      <Text>Após verificar a conta, você pode fazer login.</Text>
    </EmailLayout>
  );
};

// Função para enviar o e-mail
export async function sendEmailVerifyAccount(
  email: string,
  props: TemplateProps
) {
  // Gera o HTML a partir do componente React usando React Email
  const emailHtml = await render(<Template {...props} />);

  // Configura o Nodemailer
  await sendEmail({
    to: email,
    subject: "Confirme sua Conta",
    html: emailHtml,
  });
}
