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
import { Spinner } from "@/components/ui/shadcn-io/spinner";

import { getBlobURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BRFlag, USFlag } from "@/components/icons/flags";
import { Input } from "@/components/ui/input";

const ProfileForm = ({ data }: { data: ProfileTypes | null }) => {
  const queryClient = useQueryClient();
  const form = useForm<storeProfileTypes>({
    resolver: zodResolver(StoreProfileSchema),
    defaultValues: {
      _id: data?._id ?? "",
      name: data?.name ?? "",
      translations: {
        en: {
          title: data?.translations?.en.title ?? "",
          description: data?.translations?.en.description ?? "",
          phone: data?.translations?.en.phone ?? "",
          highlights: data?.translations?.en.highlights ?? [],
        },
        br: {
          title: data?.translations?.br.title ?? "",
          description: data?.translations?.br.description ?? "",
          phone: data?.translations?.br.phone ?? "",
          highlights: data?.translations?.br.highlights ?? [],
        },
      },
      cover: undefined,
      _cover: data?.cover,
    },
  });

  const [cover, _cover] = form.watch(["cover", "_cover"]);

  const mutation = useMutation({
    mutationFn: async (data: storeProfileTypes) => {
      const request = await UpdateOrCreate(data);
      if (request.isSuccess) {
        toast.success("Perfil salvo com sucesso", {
          position: "top-center",
        });
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
          label="Name"
          placeholder="Enter your name"
        />

        {/* Language Tabs */}
        <Tabs defaultValue="en" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="en" className="flex items-center gap-2">
              <USFlag className="w-5 h-5" />
              English
            </TabsTrigger>
            <TabsTrigger value="br" className="flex items-center gap-2">
              <BRFlag className="w-5 h-5" />
              Portugues
            </TabsTrigger>
          </TabsList>

          {/* English Tab */}
          <TabsContent value="en">
            <Card>
              <CardContent className="space-y-6 mt-5">
                <TextInput
                  control={form.control}
                  name="translations.en.title"
                  label="Title"
                  placeholder="Enter your title or role"
                />

                <TextInput
                  control={form.control}
                  name="translations.en.phone"
                  label="Phone"
                  mask="99 99999-9999"
                  placeholder="Enter phone number"
                />

                <FormField
                  control={form.control}
                  name="translations.en.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          placeholder="Enter your description"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <RepeatableHighlightField
                  control={form.control}
                  name="translations.en.highlights"
                  label="Highlights"
                  minItems={2}
                  maxItems={4}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portuguese Tab */}
          <TabsContent value="br">
            <Card>
              <CardContent className="space-y-6 mt-5">
                <TextInput
                  control={form.control}
                  name="translations.br.title"
                  label="Titulo"
                  placeholder="Informe o titulo ou cargo"
                />

                <TextInput
                  control={form.control}
                  name="translations.br.phone"
                  label="Telefone"
                  mask="99 99999-9999"
                  placeholder="Informe o telefone"
                />

                <FormField
                  control={form.control}
                  name="translations.br.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descricao</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          placeholder="Digite a descricao completa"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <RepeatableHighlightField
                  control={form.control}
                  name="translations.br.highlights"
                  label="Highlights"
                  minItems={2}
                  maxItems={4}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto de perfil</FormLabel>
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[520px]  lg:order-1 mt-3">
                <Image
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : _cover
                        ? getBlobURL(_cover as string)
                        : "https://baconmockup.com/600/600/"
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

        <FormField
          control={form.control}
          name="_id"
          render={({ field }) => <Input type="text" {...field} hidden />}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? <Spinner /> : "Salvar Perfil"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
