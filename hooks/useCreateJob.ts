import { Job } from "@/lib/generated/prisma";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { createJobSchema } from "@/lib/validations/job";

type CreateJobInput = z.infer<typeof createJobSchema>;

type ApiResponse =
  | {
      success: true;
      data: Job;
    }
  | {
      success: false;
      error: string;
    };

const createJob = async (newJob: CreateJobInput): Promise<Job> => {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });

  const result: ApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      !result.success
        ? result.error
        : `${response.status}${response.statusText}`,
    );
  }

  return result.data;
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    //On pourrait supprimer le onmutate et invalider queries dans onsuccess (check optimistic update)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] }); // REFETCH AUTOMATIQUE
    },
    onError: (error, variables, context) => {
      // Rollback en cas d'erreur
      console.error("Erreur lors de la création du job :", error);
    },
    retry: 3,
  });
};
