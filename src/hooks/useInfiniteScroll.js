import { useEffect, useRef, useState, useCallback } from "react";

export default function useInfiniteScroll(callback, options = {}) {
  const { threshold = 0.1, rootMargin = "100px", enabled = true } = options;
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Добавляем состояние для отслеживания наличия данных
  const observerRef = useRef(null);

  // Создаем callback для Intersection Observer
  const observerCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching && hasMore && enabled) {
        setIsFetching(true);
      }
    },
    [isFetching, hasMore, enabled]
  );

  // Настройка Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin,
      threshold,
    });

    observerRef.current = observer;

    return () => observer.disconnect();
  }, [observerCallback, rootMargin, threshold]);

  // Функция для установки наблюдаемого элемента
  const setObserverTarget = useCallback(
    (element) => {
      if (!element || !enabled) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current.observe(element);
      }
    },
    [enabled]
  );

  // Вызов callback при изменении состояния загрузки
  useEffect(() => {
    if (!isFetching || !enabled) return;

    const handleLoad = async () => {
      try {
        const result = await Promise.resolve(callback());

        // Проверяем результат для определения, есть ли еще данные
        if (Array.isArray(result) && result.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error in infinite scroll:", error);
      } finally {
        // Добавляем небольшую задержку для предотвращения дёргания UI
        setTimeout(() => {
          setIsFetching(false);
        }, 300);
      }
    };

    handleLoad();
  }, [isFetching, callback, enabled]);

  // Сбросить состояние при изменении enabled
  useEffect(() => {
    if (!enabled) {
      setIsFetching(false);
    }
  }, [enabled]);

  return { isFetching, hasMore, setObserverTarget, setHasMore };
}
