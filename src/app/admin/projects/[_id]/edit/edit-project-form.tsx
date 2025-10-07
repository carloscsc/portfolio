"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftFromLineIcon, X } from "lucide-react";
import Link from "next/link";

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

import { Input } from "@/components/ui/input";
import { RepeatableTextField } from "@/components/ui/custom/repeatable-field";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FileUpload } from "@/components/ui/custom/file-upload";
import { RichTextEditor } from "@/components/ui/custom/rich-editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import Image from "next/image";
import { getBlobURL } from "@/lib/utils";

const EditProjectForm = ({ data }: { data: ProjectTypes }) => {
  const [_gallery, setGallery] = useState<string[]>(data.gallery || []);
  const queryClient = useQueryClient();

  const form = useForm<UpdateProjectTypes>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      client_name: data.client_name,
      client_description: data.client_description,
      client_location: data.client_location,
      client_link: data.client_link,
      duration: data.duration,
      year: data.year,
      demo_link: data.demo_link,
      repo_link: data.repo_link,
      cover: undefined,
      client_logo: undefined,
      about_project: data.about_project,
      technologies: data.technologies,
      functionalities: data.functionalities,
      gallery: [],
      _gallery: [],
      challenges: data.challenges,
      results: data.results,
      status: data.status || "ativo",
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
      console.log(data);
      // const request = await store(data);
      // if (request.isSuccess && request.project) {
      //   alert("Projeto cadastrado com sucesso!");
      // }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projetos"] }),
  });

  const handleSubmit = (data: UpdateProjectTypes) => mutation.mutate(data);
  //
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center border-b pb-2">
        <h2 className="text-center text-lg">Adicionar Projeto</h2>

        <Button size="icon" asChild>
          <Link href="/admin/projects">
            <ArrowLeftFromLineIcon className="w-4 h-4" />
          </Link>
        </Button>
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Projeto</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o título..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração do Projeto</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe a duração..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano do Projeto</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Informe o ano..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />
            <FormField
              control={form.control}
              name="demo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link de demonstração</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe o link..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repo_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do repositório</FormLabel>
                  <FormControl>
                    <Input placeholder="Informe o link..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do cliente</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do cliente..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

            <FormField
              control={form.control}
              name="client_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização do cliente</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a localização do cliente..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover */}

            <FormField
              control={form.control}
              name="client_logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>logo do cliente</FormLabel>
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={
                        client_logo
                          ? URL.createObjectURL(client_logo)
                          : getBlobURL(data?.client_logo as string)
                      }
                      alt={data?.client_name || ""}
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
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={
                        cover
                          ? URL.createObjectURL(cover)
                          : getBlobURL(data?.cover as string)
                      }
                      alt={data?.client_name || ""}
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

          <Button type="submit">Salvar Projeto</Button>
        </form>
      </Form>
    </>
  );
};

export default EditProjectForm;
