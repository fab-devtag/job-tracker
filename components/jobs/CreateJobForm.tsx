import { useForm } from "react-hook-form";
import * as z from "zod";
import { createJobSchema } from "@/lib/validations/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "../ui/field";
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
import { FormField } from "./FormField";
import { useState } from "react";

type CreateJobInput = z.input<typeof createJobSchema>;

export const CreateJobForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error } = useCreateJob();
  const { handleSubmit, reset, control } = useForm<CreateJobInput>({
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

  const fieldsArray: {
    name: keyof CreateJobInput;
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

  const onSubmit = (data: CreateJobInput) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setIsOpen(false);
      },
    });
  };

  const handleModal = (value: boolean) => {
    setIsOpen(value);
    if (!value) reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModal}>
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
            {fieldsArray.map((field) => (
              <FormField key={field.id} element={field} control={control} />
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
