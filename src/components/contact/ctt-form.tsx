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
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "../ui/shadcn-io/spinner";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

export const CttForm = () => {
  const t = useTranslations("ctt.form");
  const form = useForm({
    resolver: zodResolver(CttSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CttType) => {
      //   const request = await UpdateOrCreate(data);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      toast.success(t("success_message"), {
        position: "bottom-right",
      });
      form.reset();
    },
  });

  const handleSubmit = (data: CttType) => mutation.mutate(data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 mt-4 max-w-4xl mx-auto px-4 md:px-0"
      >
        <TextInput
          control={form.control}
          name="name"
          label={t("name")}
          placeholder={t("name_placeholder")}
        />

        <TextInput
          control={form.control}
          name="email"
          label={t("email")}
          placeholder={t("email_placeholder")}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-4 inline-block">
                {t("message")}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={6}
                  placeholder={t("message_placeholder")}
                  className="rounded py-4 bg-toggle text-primary border-border focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size="lg"
          className="bg-highlight text-background rounded hover:bg-secondary w-full"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Spinner /> : t("button")}
        </Button>
      </form>
    </Form>
  );
};
