"use client";
import { Button } from "@/components/ui/button";
import { Job } from "@/lib/generated/prisma";
import { createJobSchema } from "@/lib/validations/job";
import z from "zod";

type ApiResponse =
  | {
      success: true;
      data: Job[];
    }
  | { success: false; error: string };

export default function TestApiPage() {
  const testGetJobs = async () => {
    console.log("Test Get Jobs");
    try {
      const response = await fetch("api/jobs");
      const result: ApiResponse = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          !result.success ? result.error : `Error: ${response.statusText}`,
        );
      }
      console.log(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  const testCreateJob = async () => {
    console.log("Test Post Jobs");
    const job: z.input<typeof createJobSchema> = {
      title: "Développeur",
      company: "Riot",
    };
    try {
      const response = await fetch("api/jobs", {
        method: "POST",
        body: JSON.stringify(job),
      });
      const result: ApiResponse = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          !result.success ? result.error : `Error: ${response.statusText}`,
        );
      }
      console.log(result.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Page de test des différentes api</h1>
      <Button onClick={testGetJobs}>Test get jobs</Button>
      <Button onClick={testCreateJob}>Test create job</Button>
    </div>
  );
}
