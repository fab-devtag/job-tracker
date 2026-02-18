"use client";
import { JobCard } from "@/components/jobs/Card";
import { CreateJobForm } from "@/components/jobs/CreateJobForm";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hooks/useJobs";

export default function JobsPage() {
  const { data: jobs, isLoading, error } = useJobs();

  if (isLoading) {
    return (
      <div>
        <h1>Liste des jobs</h1>
        <div className="flex gap-5">
          {Array.from([0, 1, 2, 3]).map((skel) => (
            <Skeleton key={skel} className="w-full max-w-sm h-50 bg-card" />
          ))}
        </div>
      </div>
    );
  }

  if (!jobs || jobs.length === 0) return <div>Aucun job</div>;

  return (
    <div className="w-full container mx-auto">
      <h1>Liste des jobs</h1>
      <div className="grid grid-cols-4 gap-5">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <CreateJobForm />
    </div>
  );
}
