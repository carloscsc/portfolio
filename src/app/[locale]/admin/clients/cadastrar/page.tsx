"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLineIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  StoreClientSchema,
  StoreClientType,
} from "@/_domain/clients/clients.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { store } from "@/_domain/clients/client.actions";
import TextInput from "@/components/forms/TextInput";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FileUpload } from "@/components/ui/custom/file-upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Image from "next/image";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useRouter } from "@/i18n/navigation";

const CadastrarCliente = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<StoreClientType>({
    resolver: zodResolver(StoreClientSchema),
    defaultValues: {
      client_name: "",
      client_location: "",
      client_link: "",
      client_description: "",
      client_description_br: "",
      client_logo: undefined,
    },
  });

  const client_logo = form.watch("client_logo");

  const mutation = useMutation({
    mutationFn: async (data: StoreClientType) => {
      const request = await store(data);
      if (request.isSuccess) {
        toast.success("Cliente criado com sucesso", {
          position: "top-center",
        });
        form.reset();
        router.replace("/admin/clients/");
      } else if (request.message) {
        toast.error(request.message.content, {
          position: "top-center",
        });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });

  const handleSubmit = (data: StoreClientType) => mutation.mutate(data);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center border-b border-border pb-4">
        <h2 className="text-center text-lg">Adicionar Cliente</h2>

        <Button
          size="icon"
          asChild
          className="bg-accent hover:bg-secondary text-primary"
        >
          <Link href="/admin/clients">
            <ArrowLeftFromLineIcon className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 mt-4"
        >
          {/* Informações Básicas */}
          <div className="space-y-6">
            <TextInput
              control={form.control}
              name="client_name"
              label="Nome do Cliente"
              placeholder="Digite o nome do cliente..."
            />

            <TextInput
              control={form.control}
              name="client_location"
              label="Localização"
              placeholder="Ex: São Paulo, Brasil"
            />

            <TextInput
              control={form.control}
              name="client_link"
              label="Link do Website (opcional)"
              placeholder="https://..."
            />

            <Separator />

            {/* Description */}
            <FormField
              control={form.control}
              name="client_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (English)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do cliente em inglês..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client_description_br"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Português)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição do cliente em português..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="client_logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                {client_logo && (
                  <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl bg-border mb-8">
                    <Image
                      src={URL.createObjectURL(client_logo)}
                      alt="Preview do logo"
                      fill
                      className="object-contain"
                      sizes="(min-width: 768px) 768px, 100vw"
                      priority
                    />
                  </div>
                )}
                <FormControl>
                  <FileUpload accept="image/*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-accent text-primary hover:bg-secondary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : "Salvar Cliente"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CadastrarCliente;
