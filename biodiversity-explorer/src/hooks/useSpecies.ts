import { useState, useEffect, useCallback } from "react";
import { fetchSpecies, FetchParams } from "../api";
import { Species } from "../types";

export function useSpecies(initialFilters: FetchParams["filters"] = {}) {
  const [data, setData] = useState<Species[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    setLoading(true);
    try {
      const newItems = await fetchSpecies({ page, filters });
      setData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return { data, loading, error, filters, setFilters, loadMore };
}
