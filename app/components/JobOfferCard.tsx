"use client";
import { memo } from "react";
import { JobOffer } from "../lib/types";

interface JobOfferCardProps {
  jobOffer: JobOffer;
  onRemoveJobOffer: (jobOfferId: number) => void;
  onChangeStatus: (jobOfferId: number, status: string) => void;
}

export const JobOfferCard = memo(
  ({ jobOffer, onRemoveJobOffer, onChangeStatus }: JobOfferCardProps) => {
    return (
      <div className="p-4 border rounded-lg w-60">
        <h2 className="uppercase text-2xl font-bold">{jobOffer.entreprise}</h2>
        <p className="text-lg mb-4">{jobOffer.poste}</p>
        <div className="flex items-center justify-between">
          <select
            defaultValue={jobOffer.status}
            onChange={(e) => onChangeStatus(jobOffer.id, e.target.value)}
            className="cursor-pointer bg-white text-black px-2 py-1 uppercase text-sm rounded-lg font-bold"
          >
            <option value="Envoyé">Envoyé</option>
            <option value="Entretien">Entretien</option>
            <option value="Refus">Refus</option>
          </select>
          <p className="text-sm italic text-gray-500">{jobOffer.date}</p>
        </div>
        <button
          className="mt-4 bg-red-500 text-red-950 px-2 py-1 uppercase text-sm rounded-lg font-bold hover:bg-red-400 cursor-pointer transition-colors duration-300"
          onClick={() => onRemoveJobOffer(jobOffer.id)}
        >
          Supprimer
        </button>
      </div>
    );
  }
);
