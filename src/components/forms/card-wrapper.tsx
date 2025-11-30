import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Link } from "@/i18n/navigation";

interface CardWrapperProps {
  title: string;
  description: string;
  footer: { title: string; href: string };
  children: React.ReactNode;
}

export default function CardWrapper({
  title,
  description,
  footer,
  children,
}: CardWrapperProps) {
  return (
    <Card className="w-[90%] md:w-[480px]">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Separator className="mb-6" />
        {children}
        <Separator className="mt-6" />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" asChild>
          <Link href={footer.href}>{footer.title}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
