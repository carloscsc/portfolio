"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

import { ProjectTypes } from "@/_domain/projects/project.schema";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { ChevronRightIcon, Plus } from "lucide-react";

const ProjectsList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projetos"],
    queryFn: async () => {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/project`,
      );
      const data = await request.json();
      return data as ProjectTypes[];
    },
  });

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b border-border pb-4">
        <h2 className="text-center text-lg">Projetos</h2>

        <Button size="icon" asChild variant="outline">
          <Link href="/admin/projects/cadastrar">
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-4">
        {isLoading ? (
          "aguarde..."
        ) : (
          <div className="space-y-2">
            {data &&
              data.length > 0 &&
              data.map((p: ProjectTypes) => (
                // <Link
                //   key={p._id}
                //   href={`/admin/projects/${p._id}/edit`}
                //   className="border p-4 w-full flex"
                // >
                //   <h2>{p.title}</h2>
                // </Link>
                <Item variant="muted" className="rounded" asChild key={p._id}>
                  <Link
                    href={`projects/${p.slug}/edit`}
                    title={p.translations.en.title}
                  >
                    <ItemContent>
                      <ItemTitle>{p.translations.en.title}</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRightIcon className="size-4" />
                    </ItemActions>
                  </Link>
                </Item>
              ))}
          </div>
        )}
      </div>
      {/* Render the list of projects here */}
    </div>
  );
};
export default ProjectsList;
