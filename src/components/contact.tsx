import { FaGithub, FaLinkedin } from "react-icons/fa";

import { MessageSquareShare } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getAndCacheProfile } from "@/_domain/profile/profile.actions";
import { notFound } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ContactProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  minimal?: boolean;
}

const Contact = async ({
  title,
  description,
  minimal = false,
  ...rest
}: ContactProps) => {
  const t = await getTranslations("ctt");

  const locale = (await getLocale()) as "en" | "br";

  const data = await getAndCacheProfile();

  if (!data) {
    return notFound();
  }

  const translation = data.translations[locale];

  return (
    <section className={cn(!minimal && "py-16 scroll-mt-24")} {...rest}>
      <div className="text-center space-y-6">
        {!minimal && (
          <h2 className="text-responsive-xl mb-4 text-primary">{title}</h2>
        )}
        {!minimal && (
          <p className="text-secondary max-w-2xl mx-auto text-responsive-md leading-relaxed px-4">
            {description}
          </p>
        )}

        <div
          className={cn(
            "flex flex-col md:flex-row gap-4 relative items-center justify-center w-full",
            !minimal && "mb-8"
          )}
        >
          <div className="flex gap-2 flex-row relative">
            <Button
              size="lg"
              className="bg-highlight text-background rounded hover:bg-secondary w-full"
              asChild
            >
              <a href={data.contato?.linkedin}>
                <FaLinkedin />
                <span className="hidden md:inline">Linkedin</span>
              </a>
            </Button>

            <Button
              size="lg"
              className="bg-highlight text-background rounded hover:bg-secondary w-full"
              asChild
            >
              <a href={data.contato?.github}>
                <FaGithub />
                <span className="hidden md:inline">Github</span>
              </a>
            </Button>

            <Button
              size="lg"
              className="bg-highlight text-background rounded hover:bg-secondary w-full"
              asChild
            >
              <a
                href={`https://api.whatsapp.com/send?phone=55${translation?.phone}`}
              >
                <MessageSquareShare />
                {t("ltalk")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
