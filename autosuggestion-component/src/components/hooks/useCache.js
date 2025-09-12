import { useRef } from "react";

export default function useCache(namespace = "default", ttlSeconds = 3600) {
  // cache object stored in-memory (per session)
  const cacheRef = useRef({});

  const setCache = (key, value) => {
    cacheRef.current[key] = {
      value,
      expiry: Date.now() + ttlSeconds * 1000,
    };
  };

  const getCache = (key) => {
    const cached = cacheRef.current[key];
    if (!cached) return null;
    if (Date.now() > cached.expiry) {
      delete cacheRef.current[key]; // expired
      return null;
    }
    return cached.value;
  };
  if (cacheRef?.current && Object.keys(cacheRef.current)?.length)
    console.log("cacheRef: ", cacheRef.current);
  return { setCache, getCache };
}
