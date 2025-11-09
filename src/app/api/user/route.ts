import { ResponseType } from "@/_domain/shared/types";
import { userDTO } from "@/_domain/user/user.actions";
import { NotFound } from "@aws-sdk/client-s3";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ResponseType | NotFound>> {
  const user = await userDTO();

  if (!user) {
    return notFound();
  }

  return NextResponse.json<ResponseType>(user);
}
