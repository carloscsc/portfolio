import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import type { ClassNamesConfig } from "react-select";
import { createTags, getAllTags } from "@/_domain/stack/actions.stack";
import { toast } from "sonner";
import { TechTagTypes } from "@/_domain/stack/stack.schema";
import { useMemo } from "react";

type SelectTechTagsProps = {
  field: ControllerRenderProps<FieldValues, any>;
};

const SelectTechTags = ({ field }: SelectTechTagsProps) => {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => await getAllTags(),
  });

  const mutation = useMutation({
    mutationFn: async (label: string) => {
      const newTag = await createTags(label);

      if (newTag.error) {
        toast.error(newTag.error, {
          position: "bottom-center",
        });
        return null;
      }

      return newTag.tag;
    },

    onSuccess: (tag) => {
      if (!tag) return;

      queryClient.setQueryData(["tags"], (old: TechTagTypes[] | undefined) => {
        if (!old) return [tag];
        const exists = old.some((t) => t.value === tag.value);
        if (exists) return old;
        return [...old, tag];
      });

      const current = field.value || [];
      field.onChange([...current, tag.value]);
    },
  });

  const handleTagCreation = (label: string) => mutation.mutate(label);

  const selectedTags = useMemo(() => {
    if (!field.value || !data) return [];

    return field.value
      .map((val: string) => data.find((tag: TechTagTypes) => tag.value === val))
      .filter((tag: TechTagTypes) => tag !== undefined);
  }, [field.value, data]);

  return (
    <CreatableSelect
      isMulti
      options={data}
      isDisabled={isFetching}
      isLoading={isFetching}
      onCreateOption={(value) => handleTagCreation(value)}
      value={selectedTags}
      onChange={(selected) => {
        field.onChange(selected ? selected.map((s) => s.value) : []);
      }}
      classNames={classNames}
      unstyled={true}
    />
  );
};
export default SelectTechTags;

const classNames: ClassNamesConfig<TechTagTypes, true> = {
  control: (state) =>
    `flex w-full rounded border border-border bg-accent px-3 py-2 text-base mt-2 ${
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
