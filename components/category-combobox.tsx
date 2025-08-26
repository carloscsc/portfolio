"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CategoryComboboxProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  placeholder?: string;
}

export function CategoryCombobox({
  categories,
  selectedCategory,
  onCategoryChange,
  placeholder = "Selecionar categoria...",
}: CategoryComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-card border-primary/20 text-white hover:bg-white/10"
        >
          {selectedCategory ? selectedCategory : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-card border-primary/20">
        <Command>
          <CommandInput
            placeholder="Pesquisar categoria..."
            className="text-white"
          />
          <CommandList>
            <CommandEmpty className="text-muted-foreground">
              Nenhuma categoria encontrada.
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onCategoryChange(null);
                  setOpen(false);
                }}
                className="text-white hover:bg-white/10"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    !selectedCategory ? "opacity-100" : "opacity-0"
                  )}
                />
                Todas as categorias
              </CommandItem>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => {
                    onCategoryChange(category);
                    setOpen(false);
                  }}
                  className="text-white hover:bg-white/10"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory === category
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
