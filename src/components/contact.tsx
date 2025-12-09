"use client";
import { Github, Linkedin, MessageSquareShare } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

const Contact = ({ phone }: { phone: string }) => {
  const t = useTranslations("ContactSection");

  return (
    <section className="py-16 scroll-mt-24" id="contact">
      <div className="text-center space-y-6">
        <h2 className="text-responsive-xl mb-4 text-primary">{t("heading")}</h2>
        <p className="text-secondary max-w-2xl mx-auto text-responsive-md leading-relaxed px-4">
          {t("description")}
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8 relative items-center justify-center w-full">
          <Button
            size="lg"
            className="bg-highlight text-background rounded hover:bg-secondary"
            asChild
          >
            <a href="https://www.linkedin.com/in/carlos-s-cantanzaro/">
              <Linkedin />
              Linkedin
            </a>
          </Button>

          <Button
            size="lg"
            className="bg-highlight text-background rounded hover:bg-secondary"
            asChild
          >
            <a href="https://github.com/carloscsc">
              <Github />
              Github
            </a>
          </Button>

          <Button
            size="lg"
            className="bg-highlight text-background rounded hover:bg-secondary"
            asChild
          >
            <a href={`https://api.whatsapp.com/send?phone=55${phone}`}>
              <MessageSquareShare />
              {t("button")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Contact;
