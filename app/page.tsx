"use client";

import { JobOffer } from "./lib/types";

import { useCallback, useEffect, useState } from "react";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { AddJobOfferForm } from "@/components/AddJobOfferForm";
import { JobOfferCard } from "@/components/JobOfferCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  const mockJobsOffer: JobOffer[] = [
    {
      id: 1,
      entreprise: "Doctolib",
      status: "Entretien",
      poste: "Développeur Frontend",
      date: "25-11-2025",
    },
    {
      id: 2,
      entreprise: "Leboncoin",
      status: "Refus",
      poste: "Développeur React",
      date: "22-11-2025",
    },
    {
      id: 3,
      entreprise: "Riot",
      status: "Envoyé",
      poste: "Développeur Next",
      date: "15-11-2025",
    },
  ];

  const { value, saveValue } = useLocalStorage<JobOffer[]>(
    "jobsOffer",
    mockJobsOffer,
  );
  const [jobsOffer, setJobsOffer] = useState<JobOffer[]>([]);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  useEffect(() => {
    setJobsOffer(value);
  }, [value]);

  const removeJobOffer = useCallback((jobOfferId: number) => {
    setJobsOffer((prev) => {
      const newValue = prev.filter((jobOffer) => jobOffer.id !== jobOfferId);
      saveValue(newValue);
      return newValue;
    });
  }, []);

  const changeJobOfferStatus = useCallback(
    (jobOfferId: number, status: string) => {
      setJobsOffer((prev) =>
        prev.map((jobsOffer) =>
          jobsOffer.id === jobOfferId
            ? { ...jobsOffer, status: status }
            : jobsOffer,
        ),
      );
    },
    [],
  );

  const addJobOffer = useCallback((jobOffer: JobOffer) => {
    setJobsOffer((prev) => {
      const newValue = [...prev, jobOffer];
      saveValue(newValue);
      return newValue;
    });
  }, []);

  return (
    <div>
      <h1 className="text-brand text-3xl uppercase font-bold">Job Tracker</h1>
      <div className="flex space-x-3 bg-bg-secondary">
        {jobsOffer.map((jobOffer) => (
          <JobOfferCard
            key={jobOffer.id}
            jobOffer={jobOffer}
            onRemoveJobOffer={removeJobOffer}
            onChangeStatus={changeJobOfferStatus}
          />
        ))}
      </div>
      {showAddJobModal && (
        <AddJobOfferForm
          addJobOffer={addJobOffer}
          closeModal={() => setShowAddJobModal(false)}
        />
      )}

      <Button onClick={() => setShowAddJobModal(true)}>Ajouter un job</Button>
    </div>
  );
}
