"use client";

import { JobOffer } from "./lib/types";
import { JobOfferCard } from "./components/JobOfferCard";
import { useCallback, useState } from "react";

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

  const [jobsOffer, setJobsOffer] = useState<JobOffer[]>(mockJobsOffer);

  const removeJobOffer = useCallback((jobOfferId: number) => {
    setJobsOffer((prev) =>
      prev.filter((jobOffer) => jobOffer.id !== jobOfferId)
    );
  }, []);

  const changeJobOfferStatus = useCallback(
    (jobOfferId: number, status: string) => {
      setJobsOffer((prev) =>
        prev.map((jobsOffer) =>
          jobsOffer.id === jobOfferId
            ? { ...jobsOffer, status: status }
            : jobsOffer
        )
      );
    },
    []
  );

  return (
    <div>
      <h1>Job Tracker</h1>
      <div className="flex space-x-3">
        {jobsOffer.map((jobOffer) => (
          <JobOfferCard
            key={jobOffer.id}
            jobOffer={jobOffer}
            onRemoveJobOffer={removeJobOffer}
            onChangeStatus={changeJobOfferStatus}
          />
        ))}
      </div>
    </div>
  );
}
