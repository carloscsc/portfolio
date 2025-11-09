import { read } from "@/_domain/projects/project.actions";
import { ProjectTypes } from "@/_domain/projects/project.schema";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ProjectTypes[] | null>> {
  const project = await read();

  if (!project) {
    return NextResponse.json(null);
  }

  return NextResponse.json<ProjectTypes[]>(project);
}
