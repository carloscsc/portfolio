"use client";

import { Plus, X } from "lucide-react";

import { type Control, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CollaboratorsInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  className?: string;
}

export function CollaboratorsInput({
  control,
  name,
  label = "Collaborators",
  className,
}: CollaboratorsInputProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const addCollaborator = () => {
    append({
      role: "",
      name: "",
      website: "",
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <FormLabel className="text-base font-medium">{label}</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addCollaborator}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Collaborators List */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border-2 border-border rounded-md p-4 space-y-3"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Collaborator {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-6 w-6"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={control}
                name={`${name}.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Designer, Developer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`${name}.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name={`${name}.${index}.website`}
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-md">
            <p className="text-sm text-muted-foreground">
              No collaborators added yet.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Click the + button to add a collaborator.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
