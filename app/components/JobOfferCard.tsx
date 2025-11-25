import { JobOffer } from "../lib/types";

interface JobOfferCardProps {
  jobOffer: JobOffer;
}

export const JobOfferCard = ({ jobOffer }: JobOfferCardProps) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2>{jobOffer.poste}</h2>
      <p>{jobOffer.entreprise}</p>
      <p>{jobOffer.statut}</p>
      <p>{jobOffer.date}</p>
    </div>
  );
};
