import { read } from "@/_domain/projects/project.actions";

export async function GET() {
  const getProjects = await read();
  return Response.json(getProjects.projects);
}
