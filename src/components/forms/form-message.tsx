import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";
import { CircleCheckBig } from "lucide-react";

interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: {
    type: "error" | "success" | "alert" | null | undefined;
    content: string;
  };
}
const FormMessage = ({ message, className }: FormMessageProps) => {
  return (
    <Alert variant={message.type} className={cn(className)}>
      {message.type === "error" && (
        <TriangleAlert className="h-4 w-4" color="#dc2626" />
      )}
      {message.type === "alert" && (
        <TriangleAlert className="h-4 w-4" color="#ca8a04" />
      )}
      {message.type === "success" && (
        <CircleCheckBig className="h-4 w-4" color="#65a30d" />
      )}

      <AlertTitle>
        {message.type === "error"
          ? "Erro!"
          : message.type === "success"
            ? "Sucesso!"
            : "Atenção!"}{" "}
      </AlertTitle>
      <AlertDescription>{message.content}</AlertDescription>
    </Alert>
  );
};

export default FormMessage;
