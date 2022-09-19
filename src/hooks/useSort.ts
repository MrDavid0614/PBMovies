import { useEffect, useState } from "react";
import { GetNowPlayingMoviesDTO } from "../common/types";

export type OnSortByChangeType = (
  value: GetNowPlayingMoviesDTO["sortBy"]
) => Promise<void>;

export function useSort(onSortByChange: OnSortByChangeType) {
  const [sortBy, setSortBy] =
    useState<GetNowPlayingMoviesDTO["sortBy"]>("popularity.desc");

  useEffect(() => {
    onSortByChange(sortBy);
  }, [sortBy]);

  return {
    sortBy,
    handleOnSortByChange: setSortBy,
  };
}
