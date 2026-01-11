import { findOne } from "@/_domain/clients/client.actions";
import { ClientType } from "@/_domain/clients/clients.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/client/[slug]">,
): Promise<NextResponse<ClientType | null>> {
  const { slug } = await ctx.params;

  const client = await findOne(slug);

  if (!client) {
    return NextResponse.json(null);
  }

  return NextResponse.json<ClientType>(client);
}
