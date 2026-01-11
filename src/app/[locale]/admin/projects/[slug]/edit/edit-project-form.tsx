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
import TextInput from "@/components/forms/TextInput";
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
import SelectTechTags from "@/components/forms/tags-select";
import SelectCategory from "@/components/forms/categ-select";
import SelectClient from "@/components/forms/client-select";
import SelectAgency from "@/components/forms/agency-select";
import { CollaboratorsInput } from "@/components/ui/custom/collaborators-input";

const EditProjectForm = ({ data }: { data: ProjectTypes }) => {
  const router = useRouter();
  const [_gallery, setGallery] = useState<string[]>(data.gallery || []);

  const queryClient = useQueryClient();

  const form = useForm<UpdateProjectTypes>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      _id: data._id,
      year: data.year || "",
      demo_link: data.demo_link,
      repo_link: data.repo_link,
      cover: undefined,
      category: data.category || [],
      technologies: data.technologies,
      client_id: data.client_id || "",
      agency_id: data.agency_id || "",
      collaborators: data.collaborators || [],
      gallery: [],
      _gallery: data.gallery || [],
      status: data.status || "ativo",
      translations: {
        en: {
          title: data.translations.en.title,
          description: data.translations.en.description,
          about_project: data.translations.en.about_project,
          functionalities: data.translations.en.functionalities,
          challenges: data.translations.en.challenges,
          results: data.translations.en.results,
          duration: data.translations.en.duration,
        },
        br: {
          title: data.translations.br.title,
          description: data.translations.br.description,
          about_project: data.translations.br.about_project,
          functionalities: data.translations.br.functionalities,
          challenges: data.translations.br.challenges,
          results: data.translations.br.results,
          duration: data.translations.br.duration,
        },
      },
    },
  });

  const [cover, gallery, technologies, categ] = form.watch([
    "cover",
    "gallery",
    "technologies",
    "category",
  ]);

  console.log(technologies);
  console.log(categ);

  console.log(form.formState.errors);

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
      <div className="w-full flex flex-row justify-between items-center border-b border-border pb-2">
        <h2 className="text-center text-lg">Adicionar Projeto</h2>
        <ButtonGroup>
          <Button
            size="icon"
            asChild
            className="bg-accent text-primary hover:bg-secondary"
          >
            <Link href="/admin/projects">
              <ArrowLeftFromLineIcon className="w-4 h-4" />
            </Link>
          </Button>

          <ButtonGroupSeparator />
          <Button
            size="default"
            asChild
            className="bg-accent text-primary hover:bg-secondary"
          >
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
          <div className="space-y-6">
            <h2>Dados Básicos do Projeto</h2>
            <Separator />

            <TextInput
              control={form.control}
              name="translations.en.title"
              label="Título do Projeto (en)"
              placeholder="Digite o título..."
            />
            <TextInput
              control={form.control}
              name="translations.br.title"
              label="Título do Projeto (br)"
              placeholder="Digite o título..."
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="translations.en.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição curta do Projeto (en)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Digite a descrição..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="translations.br.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição curta do Projeto (br)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Digite a descrição..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="translations.en.about_project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição completa do Projeto (en)</FormLabel>
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

            <FormField
              control={form.control}
              name="translations.br.about_project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição completa do Projeto (br)</FormLabel>
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
              name="translations.en.duration"
              label="Duração do Projeto (en)"
              placeholder="Informe a duração..."
            />
            <TextInput
              control={form.control}
              name="translations.br.duration"
              label="Duração do Projeto (br)"
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

            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <SelectClient field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agency_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agência</FormLabel>
                  <FormControl>
                    <SelectAgency field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <CollaboratorsInput
              control={form.control}
              name="collaborators"
              label="Collaborators"
            />

            <Separator />

            {/* <RepeatableTextField
              control={form.control}
              name="technologies"
              label="Tecnologias"
              placeholder="Ex: React, TypeScript, Node.js"
              minItems={1}
              maxItems={15}
            /> */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <SelectCategory field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tecnologias</FormLabel>
                  <FormControl>
                    <SelectTechTags field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <RepeatableTextField
              control={form.control}
              name="translations.en.functionalities"
              label="Funcionalidades (en)"
              placeholder="Ex: Login, Cadastro, Painel de Controle"
              minItems={1}
              maxItems={15}
            />
            <RepeatableTextField
              control={form.control}
              name="translations.br.functionalities"
              label="Funcionalidades (br)"
              placeholder="Ex: Login, Cadastro, Painel de Controle"
              minItems={1}
              maxItems={15}
            />

            <RepeatableTextField
              control={form.control}
              name="translations.en.challenges"
              label="Desafios (en)"
              placeholder="Ex: Desafio 1, Desafio 2"
              minItems={1}
              maxItems={15}
            />

            <RepeatableTextField
              control={form.control}
              name="translations.br.challenges"
              label="Desafios (br)"
              placeholder="Ex: Desafio 1, Desafio 2"
              minItems={1}
              maxItems={15}
            />

            <RepeatableTextField
              control={form.control}
              name="translations.en.results"
              label="Resultados (en)"
              placeholder="Ex: Resultado 1, Resultado 2"
              minItems={1}
              maxItems={15}
            />

            <RepeatableTextField
              control={form.control}
              name="translations.br.results"
              label="Resultados (br)"
              placeholder="Ex: Resultado 1, Resultado 2"
              minItems={1}
              maxItems={15}
            />
          </div>

          <div className="border-border border-2 p-4 rounded-lg space-y-6">
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
                      alt="image"
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
              className="w-full bg-highlight text-background"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Spinner /> : "ATUALIZAR O PROJETO"}
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

export default EditProjectForm;
