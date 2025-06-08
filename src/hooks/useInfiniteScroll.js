import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll(callback) {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef(null);

  const observerCallback = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isFetching) {
      setIsFetching(true);
    }
  };

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "100px", // Load more before reaching the very bottom
      threshold: 0.1,
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  // Observe target element
  const setObserverTarget = (element) => {
    if (!element) return;
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(element);
    }
  };

  // Call the callback when fetching state changes
  useEffect(() => {
    if (!isFetching) return;
    
    callback().finally(() => {
      setIsFetching(false);
    });
  }, [isFetching, callback]);

  return { isFetching, setObserverTarget };
}