import { read } from "@/_domain/clients/client.actions";
import { ClientType } from "@/_domain/clients/clients.schema";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ClientType[] | null>> {
  const client = await read();

  if (!client) {
    return NextResponse.json(null);
  }

  return NextResponse.json<ClientType[]>(client);
}
