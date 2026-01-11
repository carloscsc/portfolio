import { useQuery } from "@tanstack/react-query";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import Select from "react-select";
import type { ClassNamesConfig } from "react-select";
import { getAllClients } from "@/_domain/clients/client.actions";
import { useMemo } from "react";

type ClientOption = {
  label: string;
  value: string;
};

type SelectClientProps = {
  field: ControllerRenderProps<FieldValues, any>;
};

const SelectClient = ({ field }: SelectClientProps) => {
  const { data, isFetching } = useQuery({
    queryKey: ["clients-select"],
    queryFn: async () => await getAllClients(),
  });

  const selectedClient = useMemo(() => {
    if (!field.value || !data) return null;

    return data.find((client: ClientOption) => client.value === field.value);
  }, [field.value, data]);

  return (
    <Select
      options={data}
      isDisabled={isFetching}
      isLoading={isFetching}
      value={selectedClient}
      onChange={(selected) => {
        field.onChange(selected ? selected.value : null);
      }}
      isClearable
      placeholder="Selecione um cliente..."
      classNames={classNames}
      unstyled={true}
    />
  );
};
export default SelectClient;

const classNames: ClassNamesConfig<ClientOption, false> = {
  control: (state) =>
    `flex w-full rounded border border-border bg-accent px-3 py-2 text-base mt-2 ${
      state.isFocused ? "outline-hidden ring-2 ring-highlight" : ""
    }`,
  valueContainer: () => "gap-1",
  menu: () => "mt-2 rounded border border-border bg-accent p-1 shadow-md",
  menuList: () => "space-y-1",
  option: (state) =>
    `relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none ${
      state.isSelected
        ? "bg-highlight text-primary"
        : state.isFocused
          ? "bg-background"
          : ""
    } transition-colors`,
  placeholder: () => "text-muted-foreground",
  input: () => "outline-none",
  singleValue: () => "text-foreground",
};
