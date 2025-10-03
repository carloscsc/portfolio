"use client";

import { read } from "@/_domain/projects/project.actions";
import { ProjectTypes } from "@/_domain/projects/project.schema";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";

const ProjectsList = () => {
  const query = useQuery({
    queryKey: ["projetos"],
    queryFn: async () => await read(),
  });

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b pb-2">
        <h2 className="text-center text-lg">Projetos</h2>

        <Button size="icon" asChild>
          <Link href="/admin/projects/cadastrar">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div>
        {query.data &&
          query?.data.map((p: ProjectTypes) => (
            <div key={p._id}>
              <h2>{p.title}</h2>
            </div>
          ))}
      </div>
      {/* Render the list of projects here */}
    </div>
  );
};
export default ProjectsList;
