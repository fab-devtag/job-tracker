import { Job } from "@/lib/generated/prisma";
import { updateJobSchema } from "@/lib/validations/job";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";

type UpdateJobInput = z.input<typeof updateJobSchema>;

type ApiResponse =
  | {
      success: false;
      error: string;
    }
  | { success: true; data: Job };

const updateJob = async (updatedJob: UpdateJobInput): Promise<Job> => {
  const id = "f7bf5487-fdf2-485d-9045-2dcd225e169e";
  const response = await fetch(`/api/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedJob),
  });

  const result: ApiResponse = await response.json();

  if (!result.success || !response.ok) {
    throw new Error(!result.success ? result.error : response.statusText);
  }

  return result.data;
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
