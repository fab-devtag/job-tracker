import { useForm } from "react-hook-form";
import * as z from "zod";
import { updateJobSchema } from "@/lib/validations/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "../ui/field";
import { Button } from "../ui/button";
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
import { useUpdateJob } from "@/hooks/useUpdateJob";
import { Job } from "@/lib/generated/prisma";

type UpdateJobInput = z.input<typeof updateJobSchema>;

interface Props {
  job: Job;
}

export const EditJobForm = ({ job }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending, error } = useUpdateJob();
  const { handleSubmit, reset, control } = useForm<UpdateJobInput>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      title: job.title,
      company: job.company,
      link: job.link,
      status: job.status,
      salary: job.salary,
      localisation: job.localisation,
      notes: job.notes,
    },
  });

  const fieldsArray: {
    name: keyof UpdateJobInput;
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

  const onSubmit = (data: UpdateJobInput) => {
    mutate(
      { id: job.id, data: data },
      {
        onSuccess: () => {
          reset();
          setIsOpen(false);
        },
      },
    );
  };

  const handleModal = (value: boolean) => {
    setIsOpen(value);
    if (!value) reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModal}>
      <DialogTrigger asChild>
        <Button>Modifier</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer votre candidature</DialogTitle>
          <DialogDescription>
            Formulaire de création de candidature
          </DialogDescription>
        </DialogHeader>
        <form
          id="edit-job-form"
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
          <Button type="submit" form="edit-job-form" disabled={isPending}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
