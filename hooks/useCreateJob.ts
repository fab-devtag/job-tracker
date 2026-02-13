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
    //On pourrait supprimer le onmutate et invalider queries dans onsuccess
    onMutate: async (variables) => {
      //On annule les refetch en cours
      await queryClient.cancelQueries({ queryKey: ["jobs"] });

      //On sauvegarde l'ancien state au cas ou on doit rollback
      const previousJobs = queryClient.getQueryData<Job[]>(["jobs"]);

      //On va créer le nouveau job (optimistic update)
      const optimisticJob: Job = {
        id: crypto.randomUUID(),
        ...variables,
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      queryClient.setQueryData<Job[]>(["jobs"], (old = []) => [
        ...old,
        optimisticJob,
      ]);

      return { previousJobs, optimisticJob };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] }); // REFETCH AUTOMATIQUE
    },
    onError: (error, variables, context) => {
      // Rollback en cas d'erreur
      if (context?.previousJobs) {
        queryClient.setQueryData<Job[]>(["jobs"], context.previousJobs);
      }
    },
    onSettled: () => {
      // Refetch pour être sûr d'avoir les bonnes données
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    retry: 3,
  });
};
