import { Button } from "./ui/button";
import WhatsappIcon from "./whatsapp.icon";

const Contact = () => {
  return (
    <section className="py-16 scroll-mt-24" id="contact">
      <div className="text-center  space-y-6">
        <h2 className="text-responsive-xl font-bold mb-4">Vamos Conversar!</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-responsive-md leading-relaxed px-4">
          Tem um projeto em mente ou quer discutir oportunidades?
        </p>

        <Button
          size="lg"
          className="bg-[#27d366] hover:bg-[#28a71a]  text-white"
          asChild
        >
          <a href="#contact" className="text-responsive-lg">
            <WhatsappIcon /> Agende uma consultoria grátis!
          </a>
        </Button>
      </div>
    </section>
  );
};
export default Contact;
