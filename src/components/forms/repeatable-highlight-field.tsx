"use client";

import { Plus, X } from "lucide-react";
import { type Control, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RepeatableHighlightFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  description?: string;
  className?: string;
  minItems?: number;
  maxItems?: number;
}

export function RepeatableHighlightField({
  control,
  name,
  label,
  description,
  className,
  minItems = 0,
  maxItems = 20,
}: RepeatableHighlightFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const { formState } = useFormContext();
  const arrayError = formState.errors[name];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <FormLabel className="text-base font-medium">{label}</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => append({ header: "", text: "" })}
          disabled={fields.length >= maxItems}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {description && (
        <FormDescription className="mb-4">{description}</FormDescription>
      )}

      <div className="space-y-3 border-2 border-border rounded-md p-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start">
            <FormField
              control={control}
              name={`${name}.${index}.header`}
              render={({ field: inputField }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...inputField}
                      placeholder={`Ex: ${index === 0 ? "15+" : "50+"}`}
                      maxLength={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${name}.${index}.text`}
              render={({ field: inputField }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...inputField}
                      placeholder={`Ex: ${
                        index === 0
                          ? "Anos de Experiência"
                          : "Projetos Concluídos"
                      }`}
                      maxLength={20}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
              disabled={fields.length <= minItems}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum highlight adicionado</p>
          </div>
        )}
      </div>

      {arrayError && (
        <p className="text-sm font-medium text-destructive">
          {String(arrayError.message || "Erro de validação")}
        </p>
      )}
    </div>
  );
}
