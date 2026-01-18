"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftFromLineIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { deleteClient, update } from "@/_domain/clients/client.actions";
import {
  type ClientType,
  UpdateClientSchema,
  type UpdateClientType,
} from "@/_domain/clients/clients.schema";
import { FileUpload } from "@/components/forms/file-upload";
import TextInput from "@/components/forms/TextInput";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Link, useRouter } from "@/i18n/navigation";
import { getBlobURL } from "@/lib/utils";

const EditClientForm = ({ data }: { data: ClientType }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<UpdateClientType>({
    resolver: zodResolver(UpdateClientSchema),
    defaultValues: {
      _id: data._id,
      client_name: data.client_name,
      client_location: data.client_location,
      client_link: data.client_link || "",
      client_description: data.client_description || "",
      client_description_br: data.client_description_br || "",
      client_logo: undefined,
      _client_logo: data.client_logo,
    },
  });

  const [client_logo, _client_logo] = form.watch([
    "client_logo",
    "_client_logo",
  ]);

  const mutation = useMutation({
    mutationFn: async (data: UpdateClientType) => {
      const request = await update(data);
      if (request.isSuccess) {
        toast.success("Cliente atualizado com sucesso", {
          position: "top-center",
        });
      } else if (request.message) {
        toast.error(request.message.content, {
          position: "top-center",
        });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });

  const handleSubmit = (data: UpdateClientType) => mutation.mutate(data);

  /**
   * DELETE
   */
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const request = await deleteClient(data._id);
      if (request.isSuccess) {
        toast.success("Cliente excluído com sucesso", {
          position: "top-center",
        });
        router.replace("/admin/clients/");
      } else if (request.message) {
        toast.error(request.message.content, {
          position: "top-center",
        });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
  });

  const handleDelete = () => deleteMutation.mutate();

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center border-b border-border pb-2">
        <h2 className="text-center text-lg">Editar Cliente</h2>
        <ButtonGroup>
          <Button
            size="icon"
            asChild
            className="bg-accent text-primary hover:bg-secondary"
          >
            <Link href="/admin/clients">
              <ArrowLeftFromLineIcon className="w-4 h-4" />
            </Link>
          </Button>
        </ButtonGroup>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 mt-4"
        >
          {/* Informações Básicas */}
          <div className="space-y-6">
            <h2>Informações do Cliente</h2>
            <Separator />

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

          {/* Logo */}
          <div className="border-border border-2 p-4 rounded-md space-y-6">
            <h2>Logo do Cliente</h2>
            <FormField
              control={form.control}
              name="client_logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  {(client_logo || _client_logo) && (
                    <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl bg-card mb-8">
                      <Image
                        src={
                          client_logo
                            ? URL.createObjectURL(client_logo)
                            : getBlobURL(_client_logo!)
                        }
                        alt="Logo do cliente"
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
          </div>

          <div className="flex justify-between gap-2">
            <Button
              type="submit"
              className="w-full bg-highlight text-background"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Spinner /> : "ATUALIZAR CLIENTE"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="bg-accent"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <Spinner />
              ) : (
                <>
                  <Trash className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditClientForm;
