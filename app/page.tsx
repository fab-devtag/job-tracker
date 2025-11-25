import Image from "next/image";
import { JobOffer } from "./lib/types";
import { JobOfferCard } from "./components/JobOfferCard";

export default function Home() {
  const mockJobOffer: JobOffer[] = [
    {
      id: 1,
      entreprise: "Doctolib",
      statut: "En attente",
      poste: "Développeur Frontend",
      date: "25-11-2025",
    },
    {
      id: 2,
      entreprise: "Leboncoin",
      statut: "Refus",
      poste: "Développeur React",
      date: "22-11-2025",
    },
    {
      id: 3,
      entreprise: "Riot",
      statut: "En cours",
      poste: "Développeur Next",
      date: "15-11-2025",
    },
  ];

  return (
    <div>
      <h1>Job Tracker</h1>
      <div className="flex space-x-3">
        {mockJobOffer.map((jobOffer) => (
          <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
        ))}
      </div>
    </div>
  );
}
