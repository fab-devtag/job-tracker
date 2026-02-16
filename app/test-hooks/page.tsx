"use client";
import { Button } from "@/components/ui/button";
import { useCreateJob } from "@/hooks/useCreateJob";
import { useJobs } from "@/hooks/useJobs";
import { createJobSchema } from "@/lib/validations/job";
import z from "zod";

export default function TestHooksPage() {
  const { data, error, isLoading, refetch } = useJobs();
  const { mutate, isPending, error: createError } = useCreateJob();

  const createJob: z.input<typeof createJobSchema> = {
    title: "Développeur d'élite",
    company: "Doctolib",
  };
  if (isLoading) return <div className="p-8">Chargement des jobs...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Page de test des hooks</h1>

      <div>
        {data?.map((job) => (
          <p key={job.id}>{job.title}</p>
        ))}
      </div>
      {isPending && <div>Ajout...</div>}
      {createError && <div>{createError.message}</div>}
      <Button onClick={() => refetch()}>Test useJob query</Button>
      <Button onClick={() => mutate(createJob)} disabled={isPending}>
        Test createJob mutation
      </Button>
    </div>
  );
}
