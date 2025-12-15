import { render, Text } from "@react-email/components";

import { EmailLayout } from "../EmailLayout";
import { sendEmail } from "../../sender";

interface TemplateProps {
  name: string;
}

const Template: React.FC<TemplateProps> = ({ name }) => {
  return (
    <EmailLayout>
      <Text>Olá, {name}</Text>
      <Text>
        Meu nome é Carlos, essa é uma mensagem automática para avisar que eu
        recebi sua solicitação de contato e em breve entrarei com contato para
        gente agendar um bate-papo!
      </Text>
      <Text>Até muito em breve!</Text>
    </EmailLayout>
  );
};

export async function sendEmailContactBR(email: string, props: TemplateProps) {
  const emailHtml = await render(<Template {...props} />);

  await sendEmail({
    to: email,
    subject: "RE: Solicitação de contato",
    html: emailHtml,
  });
}
