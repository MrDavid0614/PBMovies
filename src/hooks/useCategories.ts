import { useCallback, useEffect, useState } from "react";
import { MoviesService } from "../common/services/movies";
import { MovieCategory } from "../common/types";

const moviesService = new MoviesService();

export function useCategories() {
  const [categories, setCategories] = useState<MovieCategory[]>([]);

  const getCategories = useCallback(async () => {
    const data = await moviesService.getCategories();

    if (data) {
      setCategories(data.genres);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
