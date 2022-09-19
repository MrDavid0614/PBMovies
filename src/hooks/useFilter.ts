import { useState } from "react";
import { GetNowPlayingMoviesDTO } from "../common/types";

export function useFilter() {
  const [filters, setFilters] = useState<GetNowPlayingMoviesDTO>({});

  const updateFilters = (newFilters: GetNowPlayingMoviesDTO) => {
    setFilters({ ...filters, ...newFilters });
  };

  return {
    filters,
    updateFilters,
    clearFilters: () => setFilters({}),
  };
}
