import { useState, useEffect, useCallback } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // read value from local storage
  const readValue = useCallback((): T => {
    // if window is undefined, return initial value
    if (typeof window === 'undefined') {
      return initialValue;
    }
    // try to read value from local storage
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      const parsed = JSON.parse(item);
      // if parsed value is a string and is a valid date, return it as a date
      if (typeof parsed === 'string' && !isNaN(Date.parse(parsed))) {
        return new Date(parsed) as T;
      }
      return parsed;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // use state to store value
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // set value in local storage
  const setValue = (value: T) => {
    try {
      // if value is a function, call it with the current value
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // set the value in the state
      setStoredValue(valueToStore);
      // if window is defined, set the value in local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore instanceof Date ? valueToStore.toISOString() : valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // read value from local storage on mount
  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  // return the value and setValue function
  return [storedValue, setValue];
}

export default useLocalStorage;