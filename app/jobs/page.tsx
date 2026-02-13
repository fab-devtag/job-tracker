"use client";
import { useJobs } from "@/hooks/useJobs";

export default function JobsPage() {
  const { data, isLoading, error } = useJobs();
  console.log(data);
  return (
    <div>
      <h1>Liste des jobs</h1>
    </div>
  );
}
