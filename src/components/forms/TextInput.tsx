import { withMask } from "use-mask-input";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface TextInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  placeholder?: string;
  mask?: string | string[];
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readOnly?: boolean;
  className?: string;
}

const TextInput = <T extends FieldValues>({
  readOnly = false,
  className,
  ...props
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const mask = props.mask ? withMask(props.mask) : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={field.name}
        className={cn(
          "select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block",
          error && "text-destructive"
        )}
      >
        {props.label}
      </label>

      <input
        {...field}
        type="text"
        id={props.name}
        ref={(inputElement) => {
          field.ref(inputElement);
          mask?.(inputElement);
        }}
        onChange={(event) => {
          field.onChange(event);
          props.onChange?.(event);
        }}
        placeholder={props?.placeholder}
        className={cn(
          "flex h-10 w-full border border-border bg-toggle px-3 py-6 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-highlight disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          readOnly &&
            "bg-gray-100 ring-0 focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 cursor-not-allowed",
          error &&
            "ring-destructive focus-visible:ring-red-600 border-red-600 bg-destructive-foreground",
          "rounded",
          className
        )}
        readOnly={readOnly}
      />

      {error?.message && (
        <p className="text-xs font-medium text-destructive">
          {String(error?.message)}
        </p>
      )}
    </div>
  );
};

export default TextInput;
