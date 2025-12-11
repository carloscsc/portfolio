import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "../button";
import { MessageSquareShare } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import { notFound } from "next/navigation";
import { ProfileSchema } from "@/_domain/profile/profile.schema";

const ContactLinks = async () => {
  const t = await getTranslations("ctt");

  const locale = (await getLocale()) as "en" | "br";

  const data = await getAndCacheProfile();

  if (!data) {
    return notFound();
  }

  const profile = data ? ProfileSchema.parse(data) : null;
  const translation = profile?.translations?.[locale];

  return (
    <>
      <Button
        size="lg"
        className="bg-highlight text-background rounded hover:bg-secondary"
        asChild
      >
        <a href={data.contato?.linkedin}>
          <FaLinkedin />
          Linkedin
        </a>
      </Button>

      <Button
        size="lg"
        className="bg-highlight text-background rounded hover:bg-secondary"
        asChild
      >
        <a href={data.contato?.github}>
          <FaGithub />
          Github
        </a>
      </Button>

      <Button
        size="lg"
        className="bg-highlight text-background rounded hover:bg-secondary"
        asChild
      >
        <a href={`https://api.whatsapp.com/send?phone=55${translation?.phone}`}>
          <MessageSquareShare />
          {t("ltalk")}
        </a>
      </Button>
    </>
  );
};

export default ContactLinks;
