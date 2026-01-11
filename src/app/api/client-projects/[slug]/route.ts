import { findByClient } from "@/_domain/projects/project.actions";
import { ProjectTypes } from "@/_domain/projects/project.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/client-projects/[slug]">,
): Promise<NextResponse<ProjectTypes[] | null>> {
  const { slug } = await ctx.params;

  const projects = await findByClient(slug);

  if (!projects) {
    return NextResponse.json(null);
  }

  return NextResponse.json<ProjectTypes[]>(projects);
}
