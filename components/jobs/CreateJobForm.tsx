import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { createJobSchema } from "@/lib/validations/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateJob } from "@/hooks/useCreateJob";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const CreateJobForm = () => {
  const { mutate, isPending, error } = useCreateJob();
  const { handleSubmit, control, reset, getValues } = useForm<
    z.input<typeof createJobSchema>
  >({
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
    reset();
  };

  const fieldsArray: {
    name: keyof z.input<typeof createJobSchema>;
    id: string;
    label: string;
    placeholder: string;
  }[] = [
    {
      name: "title",
      id: "create-job-form-title",
      label: "Titre",
      placeholder: "Super Développeur",
    },
    {
      name: "company",
      id: "create-job-form-company",
      label: "Company",
      placeholder: "Super Société",
    },
    {
      name: "link",
      id: "create-job-form-link",
      label: "Link",
      placeholder: "Super Link",
    },
    {
      name: "status",
      id: "create-job-form-status",
      label: "Status",
      placeholder: "Super Status",
    },
    {
      name: "salary",
      id: "create-job-form-salary",
      label: "Salary",
      placeholder: "Super Salary",
    },
    {
      name: "localisation",
      id: "create-job-form-localisation",
      label: "Localisation",
      placeholder: "Super localisation",
    },
    {
      name: "notes",
      id: "create-job-form-notes",
      label: "Notes",
      placeholder: "Super Notes",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Créer un job</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer votre candidature</DialogTitle>
          <DialogDescription>
            Formulaire de création de candidature
          </DialogDescription>
        </DialogHeader>
        <form
          id="create-job-form"
          onSubmit={handleSubmit(onSubmit)}
          className="bg-card p-5 border-2 rounded-xl"
        >
          <FieldGroup>
            {fieldsArray.map((element) => (
              <Controller
                key={element.id}
                name={element.name}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={element.id}>
                      {element.label}
                    </FieldLabel>
                    <Input
                      {...field}
                      value={field.value || ""}
                      id={element.id}
                      aria-invalid={fieldState.invalid}
                      placeholder={element.placeholder}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </form>
        {error && <p>{error.message}</p>}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button type="submit" form="create-job-form" disabled={isPending}>
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
