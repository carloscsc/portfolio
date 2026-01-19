export const Footer = () => {
  return (
    <footer className="bg-accent mt-20">
      <div className="container max-w-7xl mx-auto px-4">
        <p className="mt-12 py-8 text-center text-secondary text-sm">
          C2 Media & Tech Lab © 2014 - {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
