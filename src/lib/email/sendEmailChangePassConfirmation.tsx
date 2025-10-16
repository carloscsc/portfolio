import { render, Text } from "@react-email/components";
import { EmailLayout } from "./EmailLayout";
import { sendEmail } from "./sender";

interface TemplateProps {
  name: string;
}

const Template: React.FC<TemplateProps> = ({ name }) => {
  return (
    <EmailLayout>
      <Text>Olá, {name}</Text>
      <Text>Sua senha foi alterada com sucesso!</Text>
      <Text>Caso não tenha sido você, por favor, entre em contato</Text>
    </EmailLayout>
  );
};

// Função para enviar o e-mail
export async function sendEmailChangePassConfirmation(
  email: string,
  props: TemplateProps
) {
  // Gera o HTML a partir do componente React usando React Email
  const emailHtml = await render(<Template {...props} />);

  // Configura o Nodemailer
  await sendEmail({
    to: email,
    subject: "Sua Senha foi alterada",
    html: emailHtml,
  });
}
