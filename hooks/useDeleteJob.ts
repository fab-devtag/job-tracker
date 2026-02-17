import { useMutation, useQueryClient } from "@tanstack/react-query";

type ApiResponse =
  | {
      success: true;
    }
  | { success: false; error: string };

const removeJob = async (jobId: string) => {
  const response = await fetch(`/api/jobs/${jobId}`, {
    method: "DElETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result: ApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(!result.success ? result.error : response.statusText);
  }
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression du job : ", error);
    },
  });
};
