import { read } from "@/_domain/profile/profile.actions";
import { ProfileTypes } from "@/_domain/profile/profile.schema";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ProfileTypes | null>> {
  const profile = await read();

  if (!profile) {
    return NextResponse.json(null);
  }

  return NextResponse.json<ProfileTypes>(profile);
}
