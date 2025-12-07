"use client";
import { MessageSquareShare } from "lucide-react";
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

        <Button
          size="lg"
          className="bg-highlight hover:bg-secondary  text-background p-8 rounded"
          asChild
        >
          <a
            href={`https://api.whatsapp.com/send?phone=55${phone}`}
            className="text-responsive-lg"
          >
            <MessageSquareShare /> {t("button")}
          </a>
        </Button>
      </div>
    </section>
  );
};
export default Contact;
