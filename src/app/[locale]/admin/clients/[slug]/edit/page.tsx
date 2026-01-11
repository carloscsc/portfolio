import { notFound } from "next/navigation";
import EditClientForm from "./edit-client-form";

const EditarCliente = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const request = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/${slug}`,
  );

  if (!request.ok) {
    notFound();
  }

  const data = await request.json();

  return <EditClientForm data={data} />;
};

export default EditarCliente;
