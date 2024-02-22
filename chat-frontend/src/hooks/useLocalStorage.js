import { useState, useEffect } from "react";


export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  const setValueInLocalStorage = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setValueInLocalStorage];
}
