import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import type { ClassNamesConfig } from "react-select";
import {
  createCategory,
  getAllCategories,
} from "@/_domain/archive/archive.actions";
import { toast } from "sonner";
import { TagType } from "@/_domain/archive/archive.schema";
import { useMemo } from "react";

type SelectCategoryProps = {
  field: ControllerRenderProps<FieldValues, any>;
};

const SelectCategory = ({ field }: SelectCategoryProps) => {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await getAllCategories(),
  });

  const mutation = useMutation({
    mutationFn: async (label: string) => {
      const newCategory = await createCategory(label);

      if (newCategory.error) {
        toast.error(newCategory.error, {
          position: "bottom-center",
        });
        return null;
      }

      return newCategory.category;
    },

    onSuccess: (tag) => {
      if (!tag) return;

      queryClient.setQueryData(["category"], (old: TagType[] | undefined) => {
        if (!old) return [tag];
        const exists = old.some((t) => t.value === tag.value);
        if (exists) return old;
        return [...old, tag];
      });

      field.onChange(tag.value);
    },
  });

  const handleTagCreation = (label: string) => mutation.mutate(label);

  const selectedCategory = useMemo(() => {
    if (!field.value || !data) return null;

    return data.find((category: TagType) => category.value === field.value);
  }, [field.value, data]);

  return (
    <CreatableSelect
      options={data}
      isDisabled={isFetching}
      isLoading={isFetching}
      onCreateOption={(value) => handleTagCreation(value)}
      value={selectedCategory}
      onChange={(selected) => {
        field.onChange(selected ? selected.value : null);
      }}
      classNames={classNames}
      unstyled={true}
    />
  );
};
export default SelectCategory;

const classNames: ClassNamesConfig<TagType, false> = {
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
  placeholder: () => "text-secondary",
  input: () => "text-primary",
  noOptionsMessage: () => "py-6 text-center text-sm text-secondary",
};
