import { findOne } from "@/_domain/projects/project.actions";
import { notFound } from "next/navigation";
import EditProjectForm from "./edit-project-form";

const CadastrarProjeto = async ({
  params,
}: {
  params: Promise<{ _id: string }>;
}) => {
  const { _id } = await params;
  const data = await findOne(_id as string);

  if (!data) {
    notFound();
  }

  return <EditProjectForm data={data} />;
};

export default CadastrarProjeto;
