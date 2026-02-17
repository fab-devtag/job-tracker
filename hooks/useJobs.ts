import { Job } from "@/lib/generated/prisma";
import { useQuery } from "@tanstack/react-query";

type ApiResponse =
  | {
      success: true;
      data: Job[];
    }
  | { success: false; error: string };

const getJobs = async (): Promise<Job[]> => {
  const response = await fetch("/api/jobs");
  const result: ApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      !result.success
        ? result.error
        : `${response.status}:${response.statusText}`,
    );
  }

  return result.data;
};

export const useJobs = () => {
  const { data, isLoading, error, refetch } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: getJobs,
    retry: 3,
  });

  return { data, isLoading, error, refetch };
};
