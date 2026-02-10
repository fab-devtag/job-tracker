import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState(initialValue);
  /* console.log(initialValue); */

  useEffect(() => {
    if (localStorage.getItem(key)) {
      let storage = localStorage.getItem(key);
      if (storage) {
        setValue(JSON.parse(storage));
      }
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, [key]);

  const saveValue = (data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
    setValue(data);
  };
  /* console.log(value); */
  return { value, saveValue };
};
