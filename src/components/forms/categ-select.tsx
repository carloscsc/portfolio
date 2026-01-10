import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import type { ClassNamesConfig } from "react-select";
import {
  createCategory,
  getAllCategories,
} from "@/_domain/archive/archive.actions";
import { toast } from "sonner";
import { CategType, TagType } from "@/_domain/archive/archive.schema";
import { useMemo } from "react";

type SelectTechTagsProps = {
  field: ControllerRenderProps<FieldValues, any>;
};

const SelectCategory = ({ field }: SelectTechTagsProps) => {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["category"],
    queryFn: async () => await getAllCategories(),
  });

  console.log(data);

  const mutation = useMutation({
    mutationFn: async (category: string) => {
      const newCateg = await createCategory(category);

      if (newCateg.error) {
        toast.error(newCateg.error, {
          position: "bottom-center",
        });
        return null;
      }

      return newCateg.category;
    },

    onSuccess: (categ) => {
      if (!categ) return;

      queryClient.setQueryData(["category"], (old: CategType[] | undefined) => {
        if (!old) return [categ];
        const exists = old.some((t) => t.value === categ.value);
        if (exists) return old;
        return [...old, categ];
      });

      const current = field.value || [];
      field.onChange([...current, categ.value]);
    },
  });

  const handleTagCreation = (label: string) => mutation.mutate(label);

  const selectedCateg = useMemo(() => {
    if (!field.value || !data) return [];

    return field.value
      .map((val: string) =>
        data.find((categ: CategType) => categ.value === val),
      )
      .filter((tag: TagType) => tag !== undefined);
  }, [field.value, data]);

  return (
    <CreatableSelect
      isMulti
      options={data}
      isDisabled={isFetching}
      isLoading={isFetching}
      onCreateOption={(value) => handleTagCreation(value)}
      value={selectedCateg}
      onChange={(selected) => {
        field.onChange(selected ? selected.map((s) => s.value) : []);
      }}
      classNames={classNames}
      unstyled={true}
    />
  );
};
export default SelectCategory;

const classNames: ClassNamesConfig<TagType, true> = {
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
