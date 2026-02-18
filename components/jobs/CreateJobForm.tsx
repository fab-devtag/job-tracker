import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { createJobSchema } from "@/lib/validations/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateJob } from "@/hooks/useCreateJob";

export const CreateJobForm = () => {
  const { mutate, isPending, error } = useCreateJob();
  const { handleSubmit, control } = useForm<z.input<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      company: "",
      link: "",
      status: "WISHLIST",
      salary: "",
      localisation: "",
      notes: "",
    },
  });

  const onSubmit = (data: z.input<typeof createJobSchema>) => {
    mutate(data);
  };

  return (
    <div>
      <form id="create-job-form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-job-form-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="create-job-form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Super Développeur"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="company"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-job-form-company">
                  Company
                </FieldLabel>
                <Input
                  {...field}
                  id="create-job-form-company"
                  aria-invalid={fieldState.invalid}
                  placeholder="Super Société"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="link"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-job-form-link">Link</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="create-job-form-link"
                  aria-invalid={fieldState.invalid}
                  placeholder="Super Link"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-job-form-status">Link</FieldLabel>
                <Input
                  {...field}
                  id="create-job-form-status"
                  aria-invalid={fieldState.invalid}
                  placeholder="Super Status"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="salary"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-job-form-salary">Link</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="create-job-form-salary"
                  aria-invalid={fieldState.invalid}
                  placeholder="Super Salary"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="localisation"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-job-form-localisation">
                  Link
                </FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="create-job-form-localisation"
                  aria-invalid={fieldState.invalid}
                  placeholder="Super Localisation"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="notes"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-job-form-notes">Link</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="create-job-form-notes"
                  aria-invalid={fieldState.invalid}
                  placeholder="Super Notes"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      {error && <p>{error.message}</p>}
      <Button
        type="submit"
        className="ml-20"
        form="create-job-form"
        disabled={isPending}
      >
        Ajouter
      </Button>
    </div>
  );
};
