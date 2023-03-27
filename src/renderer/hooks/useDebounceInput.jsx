export default function useDebounceInput() {
  let timeout;

  return function (newString, callback, delay) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(newString);
    }, delay);
  };
}
