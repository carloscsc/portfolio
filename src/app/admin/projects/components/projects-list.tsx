"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  // ItemDescription,
  // ItemFooter,
  // ItemHeader,
  // ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { read } from "@/_domain/projects/project.actions";
import { ProjectTypes } from "@/_domain/projects/project.schema";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheckIcon, ChevronRightIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getBlobURL } from "@/lib/utils";

const ProjectsList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projetos"],
    queryFn: async () => await read(),
  });

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b pb-4">
        <h2 className="text-center text-lg">Projetos</h2>

        <Button size="icon" asChild>
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
                <Item variant="muted" asChild key={p._id}>
                  <Link href={`projects/${p._id}/edit`} title={p.title}>
                    <ItemContent>
                      <ItemTitle>{p.title}</ItemTitle>
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
