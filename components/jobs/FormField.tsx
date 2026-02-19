import {
  Control,
  Controller,
  useForm,
  FieldValues,
  Path,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";

interface FieldConfig<T extends FieldValues> {
  id: string;
  name: Path<T>;
  label: string;
  placeholder: string;
}

interface Props<T extends FieldValues> {
  element: FieldConfig<T>;
  control: Control<T>;
}

export const FormField = <T extends FieldValues>({
  element,
  control,
}: Props<T>) => {
  return (
    <Controller
      name={element.name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={element.id}>{element.label}</FieldLabel>
          <Input
            {...field}
            value={field.value || ""}
            id={element.id}
            aria-invalid={fieldState.invalid}
            placeholder={element.placeholder}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
