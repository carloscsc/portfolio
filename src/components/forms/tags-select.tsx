import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import type { ClassNamesConfig } from "react-select";

type SelectTechTagsProps = {
  field: ControllerRenderProps<FieldValues, any>;
};

type TagProps = { label: string; value: string };

type handleCreateTagProps = {
  value: string;
  field: ControllerRenderProps<FieldValues, any>;
};

const SelectTechTags = ({ field }: SelectTechTagsProps) => {
  const queryClient = useQueryClient();

  const [initialtags, setInitialtags] = useState<TagProps[]>([
    { label: "React.js", value: "121212" },
  ]);

  const mutation = useMutation({
    mutationFn: async ({ value, field }: handleCreateTagProps) => {
      const newTag = {
        label: value,
        value: String(Math.floor(Math.random() * 100000)),
      };

      setInitialtags([...initialtags, newTag]);
      const current = field.value || [];
      field.onChange([...current, newTag.value]);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
  });

  const handleTagCreation = ({ value, field }: handleCreateTagProps) =>
    mutation.mutate({ value, field });

  const classNames: ClassNamesConfig<TagProps, true> = {
    control: (state) =>
      `flex w-full rounded border border-border bg-accent px-3 py-2 text-base ${
        state.isFocused ? "outline-hidden ring-2 ring-highlight" : ""
      }`,
    valueContainer: () => "flex flex-wrap gap-1",
    menu: () => "mt-2 rounded border border-border bg-accent p-1 shadow-md",
    menuList: () => "space-y-1",
    option: (state) =>
      `relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none ${
        state.isSelected
          ? "bg-highlight text-primary"
          : state.isFocused
            ? "bg-background"
            : ""
      }`,
    multiValue: () =>
      "inline-flex items-center rounded bg-highlight text-background px-2 py-0.5 text-xs",
    multiValueLabel: () => "text-background",
    multiValueRemove: () =>
      "ml-1 rounded-sm hover:bg-destructive hover:text-destructive-foreground",
    placeholder: () => "text-secondary",
    input: () => "text-primary",
    noOptionsMessage: () => "py-6 text-center text-sm text-secondary",
  };

  return (
    <CreatableSelect
      isMulti
      options={initialtags}
      onCreateOption={(value) => handleTagCreation({ value, field })}
      value={initialtags.filter((tag) => field.value?.includes(tag.value))}
      onChange={(selected) => {
        console.log(field);
        field.onChange(selected ? selected.map((s) => s.value) : []);
      }}
      classNames={classNames}
      unstyled={true}
    />
  );
};
export default SelectTechTags;
