import { read } from "@/_domain/projects/actions/project.actions";

export async function GET() {
  const getProjects = await read();
  return Response.json(getProjects.projects);
}
