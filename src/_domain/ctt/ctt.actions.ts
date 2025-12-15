"use server";
import { getLocale } from "next-intl/server";
import { CttSchema, CttType } from "./ctt.schema";
import { sendEmailContactEN } from "@/lib/email/templates/en/sendEmailContactForm-en";
import { sendEmailContactBR } from "@/lib/email/templates/br/sendEmailContactForm-br";
import { sendEmailLead } from "@/lib/email/templates/sendEmailLead";

export const sendContact = async (data: CttType) => {
  const validate = CttSchema.safeParse(data);

  if (!validate.success) {
    return null;
  }

  const { name, email, message } = validate.data;

  const locale = await getLocale();

  const sendEmail = locale === "en" ? sendEmailContactEN : sendEmailContactBR;

  try {
    await sendEmail(email, {
      name,
    });

    await sendEmailLead({ name, email, message });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
