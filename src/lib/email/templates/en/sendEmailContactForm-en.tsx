import { render, Text } from "@react-email/components";

import { EmailLayout } from "../EmailLayout";
import { sendEmail } from "../../sender";

interface TemplateProps {
  name: string;
}

const Template: React.FC<TemplateProps> = ({ name }) => {
  return (
    <EmailLayout>
      <Text>Hello, {name}</Text>
      <Text>
        My name is Carlos. This is an automated message to let you know that I
        received your contact request and I&lsquo;ll be in touch soon to
        schedule a chat!
      </Text>
      <Text>Talk to you soon!</Text>
    </EmailLayout>
  );
};

export async function sendEmailContactEN(email: string, props: TemplateProps) {
  const emailHtml = await render(<Template {...props} />);

  await sendEmail({
    to: email,
    subject: "RE: Contact Request",
    html: emailHtml,
  });
}
