"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftFromLineIcon, ExternalLink, Trash, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ProjectTypes,
  UpdateProjectSchema,
  UpdateProjectTypes,
} from "@/_domain/projects/project.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";

import { Input } from "@/components/ui/input";
import TextInput from "@/components/ui/custom/TextInput";
import { RepeatableTextField } from "@/components/ui/custom/repeatable-field";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FileUpload } from "@/components/ui/custom/file-upload";
import { RichTextEditor } from "@/components/ui/custom/rich-editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import Image from "next/image";
import { getBlobURL } from "@/lib/utils";
import { deleteProject, update } from "@/_domain/projects/project.actions";
import { useRouter } from "@/i18n/navigation";

import { Spinner } from "@/components/ui/shadcn-io/spinner";

import { toast } from "sonner";

const EditProjectForm = ({ data }: { data: ProjectTypes }) => {
  const router = useRouter();
  const [_gallery, setGallery] = useState<string[]>(data.gallery || []);

  const queryClient = useQueryClient();

  const form = useForm<UpdateProjectTypes>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      _id: data._id,
      client_name: data.client_name,
      client_location: data.client_location,
      client_link: data.client_link,
      year: data.year || "",
      demo_link: data.demo_link,
      repo_link: data.repo_link,
      cover: undefined,
      client_logo: undefined,

      technologies: data.technologies,
      gallery: [],
      _gallery: data.gallery || [],
      status: data.status || "ativo",
      translations: {
        en: {
          title: data.translations.en.title,
          description: data.translations.en.description,
          client_description: data.translations.en.client_description,
          about_project: data.translations.en.about_project,
          functionalities: data.translations.en.functionalities,
          challenges: data.translations.en.challenges,
          results: data.translations.en.results,
          duration: data.translations.en.duration,
        },
        br: {
          title: data.translations.br.title,
          description: data.translations.br.description,
          client_description: data.translations.br.client_description,
          about_project: data.translations.br.about_project,
          functionalities: data.translations.br.functionalities,
          challenges: data.translations.br.challenges,
          results: data.translations.br.results,
          duration: data.translations.br.duration,
        },
      },
    },
  });

  const [cover, client_logo, gallery] = form.watch([
    "cover",
    "client_logo",
    "gallery",
  ]);

  const onRemove = (imageToRemove: string) => {
    const newArray = _gallery.filter((image) => image !== imageToRemove);
    setGallery(newArray);
    form.setValue("_gallery", newArray);
  };

  const onRemoveGalery = (index: number) => {
    if (gallery) {
      const newArray = gallery.filter((image, _) => _ !== index);
      form.setValue("gallery", newArray);
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: UpdateProjectTypes) => {
      const request = await update(data);
      if (request.isSuccess) {
        toast.success("Projeto atualizado com sucesso", {
          position: "top-center",
        });
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projetos"] }),
  });

  const handleSubmit = (data: UpdateProjectTypes) => mutation.mutate(data);

  /**
   * DELETE
   */
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const request = await deleteProject(data._id);
      if (request.isSuccess) {
        router.replace("/admin/projects/");
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projetos"] }),
  });

  const handleDelete = () => deleteMutation.mutate();

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center border-b pb-2">
        <h2 className="text-center text-lg">Adicionar Projeto</h2>
        <ButtonGroup>
          <Button size="icon" asChild>
            <Link href="/admin/projects">
              <ArrowLeftFromLineIcon className="w-4 h-4" />
            </Link>
          </Button>

          <ButtonGroupSeparator />
          <Button size="default" asChild>
            <Link href={`/projects/${data.slug}`}>
              <ExternalLink className="w-4 h-4" /> Ver projeto
            </Link>
          </Button>
        </ButtonGroup>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-8 mt-4"
        >
          {/* Projeto */}
          <div className="border-dashed border-2 p-4 rounded-md space-y-6">
            <h2>Dados Básicos do Projeto</h2>
            <Separator />
            <TextInput
              control={form.control}
              name="title"
              label="Título do Projeto"
              placeholder="Digite o título..."
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição curta do Projeto</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Digite a descrição..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about_project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição completa do Projeto</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      placeholder="Digite a descrição completa do projeto..."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Duration */}
            <TextInput
              control={form.control}
              name="duration"
              label="Duração do Projeto"
              placeholder="Informe a duração..."
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano do Projeto</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Informe o ano..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            <TextInput
              control={form.control}
              name="demo_link"
              label="Link de demonstração"
              placeholder="Informe o link..."
            />

            <TextInput
              control={form.control}
              name="repo_link"
              label="Link do repositório"
              placeholder="Informe o link..."
            />
            <Separator />

            <RepeatableTextField
              control={form.control}
              name="technologies"
              label="Tecnologias"
              placeholder="Ex: React, TypeScript, Node.js"
              minItems={1}
              maxItems={15}
            />

            <RepeatableTextField
              control={form.control}
              name="functionalities"
              label="Funcionalidades"
              placeholder="Ex: Login, Cadastro, Painel de Controle"
              minItems={1}
              maxItems={15}
            />

            <RepeatableTextField
              control={form.control}
              name="challenges"
              label="Desafios"
              placeholder="Ex: Desafio 1, Desafio 2"
              minItems={1}
              maxItems={15}
            />

            <RepeatableTextField
              control={form.control}
              name="results"
              label="Resultados"
              placeholder="Ex: Resultado 1, Resultado 2"
              minItems={1}
              maxItems={15}
            />
          </div>

          {/* Cliente */}
          <div className="border-dashed border-2 p-4 rounded-md space-y-6">
            <h2>Dados do Cliente</h2>
            <Separator />
            <TextInput
              control={form.control}
              name="client_name"
              label="Nome do cliente"
              placeholder="Digite o nome do cliente..."
            />

            <FormField
              control={form.control}
              name="client_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do cliente</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite a descrição do cliente..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TextInput
              control={form.control}
              name="client_location"
              label="Localização do cliente"
              placeholder="Digite a localização do cliente..."
            />

            {/* Cover */}

            <FormField
              control={form.control}
              name="client_logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>logo do cliente</FormLabel>

                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-card mb-8">
                    <Image
                      src={
                        client_logo
                          ? URL.createObjectURL(client_logo)
                          : getBlobURL(data?.client_logo as string)
                      }
                      alt={data?.client_name || ""}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 768px, 100vw"
                      priority
                    />
                  </div>
                  <FormControl>
                    <FileUpload accept="image/*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="border-dashed border-2 p-4 rounded-md space-y-6">
            <h2>Imagens</h2>
            {/* Cover */}
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem de Capa</FormLabel>

                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-card mb-8">
                    <Image
                      src={
                        cover
                          ? URL.createObjectURL(cover)
                          : getBlobURL(data?.cover as string)
                      }
                      alt={data?.client_name || ""}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 768px, 100vw"
                      priority
                    />
                  </div>
                  <FormControl>
                    <FileUpload accept="image/*" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gallery */}
            <FormField
              control={form.control}
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galeria</FormLabel>
                  {((_gallery && _gallery?.length > 0) ||
                    (gallery && gallery.length > 0)) && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {_gallery &&
                        _gallery.length > 0 &&
                        _gallery.map((image, _) => (
                          <div key={_} className="relative">
                            <Image
                              src={getBlobURL(image)}
                              alt=""
                              width={300}
                              height={200}
                              className="h-auto w-full rounded-lg object-cover"
                            />
                            <Button
                              type="button"
                              className="border bg-white w-8 h-8 absolute right-2 top-2"
                              onClick={() => onRemove(image)}
                            >
                              <X />
                            </Button>
                          </div>
                        ))}

                      {gallery &&
                        gallery.length > 0 &&
                        gallery.map((image, _) => (
                          <div key={_} className="relative">
                            <Image
                              src={URL.createObjectURL(image)}
                              alt=""
                              width={300}
                              height={200}
                              className="h-auto w-full rounded-lg object-cover"
                            />
                            <Button
                              type="button"
                              className="border bg-white w-8 h-8 absolute right-2 top-2"
                              onClick={() => onRemoveGalery(_)}
                            >
                              <X />
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}
                  <FormControl>
                    <FileUpload accept="image/*" multiple {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Spinner /> : "Salvar Projeto"}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <Spinner />
              ) : (
                <>
                  <Trash className="w-4 h-4" /> Apagar
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditProjectForm;
