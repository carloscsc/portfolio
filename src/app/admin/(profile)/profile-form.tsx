"use client";

import {
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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

const ProfileForm = () => {
  const form = useForm<storeProfileTypes>({
    resolver: zodResolver(StoreProfileSchema),
    defaultValues: {
      name: "Carlos",
      title: "Engenheiro de Software",
      description:
        "Desenvolvo sistemas que ajudam empresas a crescerem: plataformas de sorteios e promoções, landing pages, sites institucionais, CRMs personalizados, automações de atendimento e integrações com ferramentas de marketing digital.... Não importa o desafio, meu trabalho é encontrar a solução certa para seu problema.",
      phone: "11989631661",
      cover: undefined,
      _cover:
        "https://media.licdn.com/dms/image/v2/C4E03AQHipCurSx0GVQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1516935311308?e=1762992000&v=beta&t=Cv4KV41Ck8Qwi1U8VD3s9ljLJmDMNadSTcIOlzPYhEQ",
      highlights: [
        { header: "15+", text: "Anos de Experiência" },
        { header: "50+", text: "Projetos Concluidos" },
      ],
    },
  });

  const [cover, _cover] = form.watch(["cover", "_cover"]);

  const submit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="space-y-8 mt-4">
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
                  src={cover ? URL.createObjectURL(cover) : (_cover as string)}
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

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
