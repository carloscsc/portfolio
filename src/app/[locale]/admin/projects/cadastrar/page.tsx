// TODO: change regular inputs for TextField

"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLineIcon, X } from "lucide-react";
import { Link } from "@/i18n/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  StoreProjectSchema,
  StoreProjectTypes,
} from "@/_domain/projects/project.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { store } from "@/_domain/projects/project.actions";
import { Input } from "@/components/ui/input";
import TextInput from "@/components/forms/TextInput";
import { RepeatableTextField } from "@/components/ui/custom/repeatable-field";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FileUpload } from "@/components/ui/custom/file-upload";
import { RichTextEditor } from "@/components/ui/custom/rich-editor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Image from "next/image";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { useRouter } from "@/i18n/navigation";
import SelectTechTags from "@/components/forms/tags-select";
import SelectCategory from "@/components/forms/categ-select";
import SelectClient from "@/components/forms/client-select";
import SelectAgency from "@/components/forms/agency-select";
import { CollaboratorsInput } from "@/components/ui/custom/collaborators-input";

// TODO: apagar campos depois de enviar

// TODO: Adicionar Rich Editor

const CadastrarProjeto = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<StoreProjectTypes>({
    resolver: zodResolver(StoreProjectSchema),
    defaultValues: {
      year: String(new Date().getFullYear()),
      demo_link: "",
      repo_link: "",
      cover: undefined,
      technologies: [],
      category: [],
      gallery: [],
      client_id: "",
      agency_id: "",
      collaborators: [],
      status: "ativo",
      translations: {
        en: {
          title: "",
          description: "",

          about_project: "",
          functionalities: [],
          challenges: [],
          results: [],
          duration: "",
        },
        br: {
          title: "",
          description: "",

          about_project: "",
          functionalities: [],
          challenges: [],
          results: [],
          duration: "",
        },
      },
    },
  });

  const [cover, gallery] = form.watch(["cover", "gallery"]);

  const mutation = useMutation({
    mutationFn: async (data: StoreProjectTypes) => {
      const request = await store(data);
      if (request.isSuccess && request.project) {
        toast.success("Projeto criado com sucesso", {
          position: "top-center",
        });
        form.reset();
        router.replace("/admin/projects/");
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projetos"] }),
  });

  const handleSubmit = (data: StoreProjectTypes) => mutation.mutate(data);

  const onRemoveGalery = (index: number) => {
    if (gallery) {
      const newArray = gallery.filter((image, _) => _ !== index);
      form.setValue("gallery", newArray);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center border-b border-border pb-4">
        <h2 className="text-center text-lg">Add a Project</h2>

        <Button
          size="icon"
          asChild
          className="bg-accent hover:bg-secondary text-primary"
        >
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
          <div className="space-y-6">
            <h2>Basic Infos about the Project</h2>
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

          <div className="border-border border-2 p-4 rounded-md space-y-6">
            <h2>Imagens</h2>
            {/* Cover */}
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem de Capa</FormLabel>
                  {cover && (
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-card mb-8">
                      <Image
                        src={cover && URL.createObjectURL(cover)}
                        alt=""
                        fill
                        className="object-cover"
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

            {/* Gallery */}
            <FormField
              control={form.control}
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galeria</FormLabel>
                  {gallery && gallery.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

          <Button
            type="submit"
            className="w-full bg-accent text-primary hover:bg-secondary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : "Salvar Projeto"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CadastrarProjeto;
