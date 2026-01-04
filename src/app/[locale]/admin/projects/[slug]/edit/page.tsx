import { notFound } from "next/navigation";
import EditProjectForm from "./edit-project-form";

const CadastrarProjeto = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${slug}`,
  );

  if (!request.ok) {
    notFound();
  }

  const data = await request.json();

  return <EditProjectForm data={data} />;
};

export default CadastrarProjeto;
