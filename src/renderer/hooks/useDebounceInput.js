import { useRef } from 'react';

export default function useDebounceInput() {
  const timeout = useRef();

  return function debounce(newString, callback, delay) {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      callback(newString);
    }, delay);
  };
}
