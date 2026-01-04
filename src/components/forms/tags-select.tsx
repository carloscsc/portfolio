import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

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
    />
  );
};
export default SelectTechTags;
