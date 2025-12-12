"use client";

import { CttSchema, CttType } from "@/_domain/ctt/ctt.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import TextInput from "../forms/TextInput";
import { RichTextEditor } from "../ui/custom/rich-editor";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../ui/shadcn-io/spinner";
import { Button } from "../ui/button";

export const CttForm = () => {
  const form = useForm({
    resolver: zodResolver(CttSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  console.log(form.formState.errors);

  const mutation = useMutation({
    mutationFn: async (data: CttType) => {
      //   const request = await UpdateOrCreate(data);
      console.log(data);
    },
  });

  const handleSubmit = (data: CttType) => mutation.mutate(data);

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

        <TextInput
          control={form.control}
          name="email"
          label="E-mail"
          placeholder="Enter your e-mail"
        />

        <TextInput
          control={form.control}
          name="phone"
          label="Phone"
          mask="99 99999-9999"
          placeholder="Informe o telefone"
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>message</FormLabel>
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

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? <Spinner /> : "Enviar"}
        </Button>
      </form>
    </Form>
  );
};
