import { Job } from "@/lib/generated/prisma";
import { updateJobSchema } from "@/lib/validations/job";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";

type UpdateJobInput = z.input<typeof updateJobSchema>;

type UpdateJobMutationInput = {
  id: string;
  data: UpdateJobInput;
};

type ApiResponse =
  | {
      success: false;
      error: string;
    }
  | { success: true; data: Job };

const updateJob = async ({
  id,
  data,
}: UpdateJobMutationInput): Promise<Job> => {
  const response = await fetch(`/api/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
