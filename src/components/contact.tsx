import { getTranslations } from "next-intl/server";
import ContactLinks from "./ui/custom/contact-links";

const Contact = async () => {
  const t = await getTranslations("ContactSection");

  return (
    <section className="py-16 scroll-mt-24" id="contact">
      <div className="text-center space-y-6">
        <h2 className="text-responsive-xl mb-4 text-primary">{t("heading")}</h2>
        <p className="text-secondary max-w-2xl mx-auto text-responsive-md leading-relaxed px-4">
          {t("description")}
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8 relative items-center justify-center w-full">
          <ContactLinks />
        </div>
      </div>
    </section>
  );
};
export default Contact;
