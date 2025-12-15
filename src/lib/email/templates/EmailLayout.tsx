import {
  Html,
  Head,
  Font,
  Body,
  Container,
  Tailwind,
  Img,
  Link,
} from "@react-email/components";

interface EmailLayoutProps {
  children: React.ReactNode;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const EmailLayout: React.FC<EmailLayoutProps> = ({ children }) => {
  return (
    <Html lang="pt-br">
      <Head>
        <Font
          fontFamily="Open Sans"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
            format: "woff2",
          }}
          fontWeight={300}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: "#191C1C",
                primary: "#CFCEC4",
                border: "#404040",
                highlight: "#399ED5",
              },
            },
          },
        }}
      >
        <Body className="bg-border box-border">
          <Container className="mx-auto my-8 p-8 bg-background text-primary border border-border rounded-lg max-w-2xl">
            <Link
              href={baseUrl}
              title="I'm Carlos S. Cantanzaro"
              className="block text-center"
            >
              <Img
                src={`${baseUrl}/favicon.png`}
                width="75"
                height="75"
                alt="I'm CSC"
                className="mx-auto block"
              />
            </Link>

            {children}
            <p className="mt-5">
              att, <br />
              Carlos S. Cantanzaro
            </p>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
