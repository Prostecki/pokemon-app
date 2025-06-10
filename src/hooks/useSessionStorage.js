import { useState } from "react";

export function useSessionStorage(key, initialValue) {
  // Check if value already exists in localStorage
  const storedValue = sessionStorage.getItem(key);

  // Set initial state based on localStorage or initialValue
  const [value, setValue] = useState(
    storedValue ? JSON.parse(storedValue) : initialValue
  );

  // Function to update both state and localStorage
  const updateValue = (newValue) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}
