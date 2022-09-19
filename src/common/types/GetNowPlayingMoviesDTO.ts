export type GetNowPlayingMoviesDTO = {
  page?: number;
  sortBy?: "popularity.desc" | "original_title.asc" | "release_date.desc";
  withGenres?: number[];
};
