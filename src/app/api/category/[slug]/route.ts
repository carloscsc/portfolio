import { findByCategory } from "@/_domain/projects/project.actions";
import { ProjectTypes } from "@/_domain/projects/project.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/category/[slug]">,
): Promise<NextResponse<ProjectTypes[] | null>> {
  const { slug } = await ctx.params;

  const project = await findByCategory(slug);

  if (!project) {
    return NextResponse.json(null);
  }

  return NextResponse.json<ProjectTypes[]>(project);
}
