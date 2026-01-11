"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";

import { ClientType } from "@/_domain/clients/clients.schema";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { ChevronRightIcon, Plus } from "lucide-react";

const ClientsList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/client`,
      );
      const data = await request.json();
      return data as ClientType[];
    },
  });

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center border-b border-border pb-4">
        <h2 className="text-center text-lg">Clientes</h2>

        <Button size="icon" asChild variant="outline">
          <Link href="/admin/clients/cadastrar">
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
              data.map((client: ClientType) => (
                <Item
                  variant="muted"
                  className="rounded"
                  asChild
                  key={client._id}
                >
                  <Link
                    href={`clients/${client.slug}/edit`}
                    title={client.client_name}
                  >
                    <ItemContent>
                      <ItemTitle>{client.client_name}</ItemTitle>
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
    </div>
  );
};
export default ClientsList;
