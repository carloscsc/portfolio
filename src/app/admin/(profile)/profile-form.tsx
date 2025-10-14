"use client";

import { UpdateOrCreate } from "@/_domain/profile/profile.actions";
import {
  ProfileTypes,
  StoreProfileSchema,
  storeProfileTypes,
} from "@/_domain/profile/profile.schema";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/custom/file-upload";
import { RepeatableHighlightField } from "@/components/ui/custom/repeatable-highlight-field";
import { RichTextEditor } from "@/components/ui/custom/rich-editor";
import TextInput from "@/components/ui/custom/TextInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getBlobURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";

const ProfileForm = ({ data }: { data: ProfileTypes }) => {
  const queryClient = useQueryClient();
  const form = useForm<storeProfileTypes>({
    resolver: zodResolver(StoreProfileSchema),
    defaultValues: {
      name: data.name,
      title: data.title,
      description: data.description,
      phone: data.phone,
      cover: undefined,
      _cover: data.cover,
      highlights: data.highlights,
      profile_count: 1,
      footer: data.footer,
    },
  });

  const [cover, _cover] = form.watch(["cover", "_cover"]);

  const mutation = useMutation({
    mutationFn: async (data: storeProfileTypes) => {
      const request = await UpdateOrCreate(data);
      if (request.isSuccess) {
        alert("Projeto atualizado com sucesso!");
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });

  const handleSubmit = (data: storeProfileTypes) => mutation.mutate(data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 mt-4"
      >
        <TextInput
          control={form.control}
          name="name"
          label="Nome"
          placeholder="Informe o nome"
        />

        <TextInput
          control={form.control}
          name="title"
          label="Titulo"
          placeholder="Informe o titulo ou cargo"
        />

        <TextInput
          control={form.control}
          name="phone"
          label="Informe o telefone"
          mask="99 99999-9999"
          placeholder="Informe o titulo ou cargo"
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição completa do Projeto</FormLabel>
              <FormControl>
                <RichTextEditor
                  placeholder="Digite a descrição completa"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto de perfil</FormLabel>
              <div className="relative w-full h-[400px]">
                <Image
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : getBlobURL(_cover as string)
                  }
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <FormControl>
                <FileUpload accept="image/*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <RepeatableHighlightField
          control={form.control}
          name="highlights"
          label="Highlights"
          minItems={1}
          maxItems={4}
        />

        <FormField
          control={form.control}
          name="footer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Footer</FormLabel>
              <FormControl>
                <RichTextEditor
                  placeholder="Informe o rodapé do site"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
