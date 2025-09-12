import { useState, useEffect, useRef, useCallback } from "react";

export function usePollAsync(asyncFunc, delay = 2000, retries = 3) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timerRef = useRef(null);
  const canceledRef = useRef(false);

  const start = useCallback(() => {
    canceledRef.current = false;
    let attempts = 0;

    setLoading(true);
    setData(null);
    setError(null);

    const poll = async () => {
      if (canceledRef.current) return;

      attempts++;
      try {
        const result = await asyncFunc();
        setData(result);

        if (result?.completed) {
          setLoading(false);
          return; // stop polling
        }

        if (attempts >= retries) {
          setError(new Error("Limit reached"));
          setLoading(false);
          return;
        }

        timerRef.current = setTimeout(poll, delay);
      } catch (err) {
        if (!canceledRef.current) {
          setError(err);
          setLoading(false);
        }
      }
    };

    poll();
  }, [asyncFunc, delay, retries]);

  const cancel = useCallback(() => {
    canceledRef.current = true;
    clearTimeout(timerRef.current);
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => cancel(); // auto cancel on unmount
  }, [cancel]);

  return { data, loading, error, start, cancel };
}
