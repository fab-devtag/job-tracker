"use client";
import { Button } from "@/components/ui/button";
import { useCreateJob } from "@/hooks/useCreateJob";
import { useDeleteJob } from "@/hooks/useDeleteJob";
import { useJobs } from "@/hooks/useJobs";
import { useUpdateJob } from "@/hooks/useUpdateJob";
import { createJobSchema, updateJobSchema } from "@/lib/validations/job";
import z from "zod";

export default function TestHooksPage() {
  const { data, error, isLoading, refetch } = useJobs();
  const {
    mutate: createJobMutation,
    isPending: isPendingCreate,
    error: createError,
  } = useCreateJob();
  const {
    mutate: removeJobMutation,
    isPending: isPendingDelete,
    error: deleteError,
  } = useDeleteJob();
  const {
    mutate: updateJobMutation,
    isPending: isPendingUpdate,
    error: updateError,
  } = useUpdateJob();

  const createJob: z.input<typeof createJobSchema> = {
    title: "Développeur d'élite",
    company: "Doctolib",
  };

  const updateJob: z.input<typeof updateJobSchema> = {
    title: "Developpeur modifié par mutation",
  };

  if (isLoading) return <div className="p-8">Chargement des jobs...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>Page de test des hooks</h1>

      <div>
        {data?.map((job) => (
          <div key={job.id}>
            <p>{job.id}</p>
            <p>{job.title}</p>
            <Button
              onClick={() => removeJobMutation(job.id)}
              disabled={isPendingDelete}
            >
              Test deleteJob mutation
            </Button>
            <Button
              onClick={() => updateJobMutation(updateJob)}
              disabled={isPendingUpdate}
            >
              Test updateJob mutation
            </Button>
          </div>
        ))}
      </div>
      {isPendingCreate && <div>Ajout...</div>}
      {isPendingDelete && <div>Suppression...</div>}
      {isPendingUpdate && <div>Mise à jour</div>}
      {createError && <div>{createError.message}</div>}
      {deleteError && <div>{deleteError.message}</div>}
      {updateError && <div>{updateError.message}</div>}
      <Button onClick={() => refetch()}>Test useJob query</Button>
      <Button
        onClick={() => createJobMutation(createJob)}
        disabled={isPendingCreate}
      >
        Test createJob mutation
      </Button>
    </div>
  );
}
