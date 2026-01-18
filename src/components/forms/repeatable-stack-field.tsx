"use client";
import { Plus, X } from "lucide-react";
import { type Control, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SelectTechTags from "./tags-select";

type StackFieldProps = {
  control: Control<any>;
  name: string;
};

const StackField = ({ control, name }: StackFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  console.log(fields);

  const { formState } = useFormContext();
  const arrayErrors = formState.errors[name];

  console.log(arrayErrors);

  return (
    <div className="space-y-6 border border-border p-4 rounded-md">
      <FormLabel className="text-lg font-medium block">Skills</FormLabel>

      <div className="space-y-6 border-2 border-border rounded-md p-4 ">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex justify-center items-center flex-row w-full gap-4"
          >
            <FormField
              control={control}
              name={`${name}.${index}.name`}
              render={({ field: inputField }) => (
                <FormItem>
                  <FormControl>
                    <Input {...inputField} placeholder={`Ex: Front End`} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${name}.${index}.technologies`}
              render={({ field: inputField }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <SelectTechTags field={inputField} />
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
              disabled={fields.length <= 1}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No skills added yet</p>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        size="default"
        className="w-full"
        onClick={() => append({ name: "", technologies: [] })}
      >
        <Plus className="w-4 h-4" /> Add Skill
      </Button>
    </div>
  );
};
export default StackField;
