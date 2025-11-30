"use client";
import { Button } from "./ui/button";
import WhatsappIcon from "./whatsapp.icon";
import { useTranslations } from "next-intl";

const Contact = ({ phone }: { phone: string }) => {
  const t = useTranslations("ContactSection");

  return (
    <section className="py-16 scroll-mt-24" id="contact">
      <div className="text-center  space-y-6">
        <h2 className="text-responsive-xl font-bold mb-4">{t("heading")}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-responsive-md leading-relaxed px-4">
          {t("description")}
        </p>

        <Button
          size="lg"
          className="bg-[#27d366] hover:bg-[#28a71a]  text-white"
          asChild
        >
          <a
            href={`https://api.whatsapp.com/send?phone=55${phone}`}
            className="text-responsive-lg"
          >
            <WhatsappIcon /> {t("button")}
          </a>
        </Button>
      </div>
    </section>
  );
};
export default Contact;
