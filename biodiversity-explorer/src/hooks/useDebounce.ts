import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  // State and setter for the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer that will update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: if value or delay changes before the timeout completes,
    // clear the previous timer so we don't update too early
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect whenever `value` or `delay` change

  // Return the debounced value — this will only update after the delay
  return debouncedValue;
}
