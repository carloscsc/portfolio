import { render, Text, Hr } from "@react-email/components";

import { EmailLayout } from "./EmailLayout";
import { sendEmail } from "../sender";

interface TemplateProps {
  name: string;
  email: string;
  message: string;
}

const Template: React.FC<TemplateProps> = ({ name, email, message }) => {
  return (
    <EmailLayout>
      <Text className="text-lg font-bold">🔔 Nova solicitação de contato</Text>

      <Hr className="my-5" />

      <Text className="font-bold mb-1">Nome:</Text>
      <Text className="mt-0">{name}</Text>

      <Text className="font-bold mb-1">E-mail:</Text>
      <Text className="mt-0">{email}</Text>

      <Text className="font-bold mb-1">Mensagem:</Text>
      <Text className="mt-0 whitespace-pre-wrap">{message}</Text>

      <Hr className="my-5" />
    </EmailLayout>
  );
};

export async function sendEmailLead(props: TemplateProps) {
  const emailHtml = await render(<Template {...props} />);

  await sendEmail({
    to: "carlos.azarro@gmail.com",
    subject: `🚀 NOVO LEAD: ${props.name}`,
    html: emailHtml,
  });
}
