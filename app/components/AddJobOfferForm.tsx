"use client";

import { ChangeEvent, useReducer } from "react";
import { JobOffer } from "../lib/types";

interface AddJobOfferProps {
  addJobOffer: (jobOffer: JobOffer) => void;
}

interface AddJobFormState {
  entreprise: string;
  poste: string;
  status: string;
  date: string;
  errors: string;
}

type AddJobFormAction =
  | { type: "SET_FIELDS"; field: keyof AddJobFormState; value: string }
  | { type: "RESET" };

export const AddJobOfferForm = ({ addJobOffer }: AddJobOfferProps) => {
  const initialAddJobForm = {
    entreprise: "",
    poste: "",
    status: "",
    date: "",
    errors: "",
  };

  const addJobReducer = (state: AddJobFormState, action: AddJobFormAction) => {
    switch (action.type) {
      case "SET_FIELDS":
        return { ...state, [action.field]: action.value };
      case "RESET":
        return initialAddJobForm;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(addJobReducer, initialAddJobForm);

  const handleAddJob = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.entreprise) {
      //dispatch seterror
      return;
    }
    addJobOffer({ id: Date.now(), ...state });
    dispatch({ type: "RESET" });
  };

  return (
    <div className="absolute flex items-center justify-center inset-0">
      <div className="bg-bgPrimary text-textPrimary ">
        <form className="flex flex-col border" onSubmit={handleAddJob}>
          <input
            type="text"
            value={state.entreprise}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELDS",
                field: "entreprise",
                value: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={state.poste}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELDS",
                field: "poste",
                value: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={state.status}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELDS",
                field: "status",
                value: e.target.value,
              })
            }
          />
          <input
            type="text"
            value={state.date}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELDS",
                field: "date",
                value: e.target.value,
              })
            }
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
};
