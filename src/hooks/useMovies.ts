import { useCallback, useEffect, useRef, useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  OrderByDirection,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { COLLECTION_NAME } from "../common/constants";
import { MoviesService } from "../common/services/movies";
import { SearchMovieDTO } from "../common/types";
import { GetNowPlayingMoviesDTO } from "../common/types/GetNowPlayingMoviesDTO";
import { Movie } from "../common/types/Movie";
import { db } from "../database/firebase";

type View = "now_playing" | "favorites";
type GetNowPlayingMoviesParams = GetNowPlayingMoviesDTO & {
  reload?: boolean;
};

const moviesService = new MoviesService();

export function useMovies(view: View) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = useRef(1);
  const totalPages = useRef(0);

  const searchMovie = async (dto: SearchMovieDTO) => {
    setIsLoading(true);
    if (!dto.title) return await getNowPlayingMovies({ page: 1 });

    const data = await moviesService.search(dto);
    if (data) {
      setMovies(data.results);
    }
    setIsLoading(false);
  };

  const getNowPlayingMovies = useCallback(
    async ({
      page,
      sortBy,
      withGenres,
      reload = true,
    }: GetNowPlayingMoviesParams) => {
      if (reload) setIsLoading(true);

      if (page) currentPage.current = page;
      const data = await moviesService.getNowPlaying({
        page: currentPage.current,
        sortBy,
        withGenres,
      });

      if (data) {
        const { results, total_pages } = data;
        setMovies((prevMovies) => {
          if (page === 1 || (withGenres && !!withGenres.length)) return results;

          return [...prevMovies, ...results];
        });
        totalPages.current = total_pages;
        if (reload) setIsLoading(false);
      }
    },
    []
  );

  const fetchMoreMovies = async () => {
    if (currentPage.current < totalPages.current) {
      currentPage.current += 1;
      await getNowPlayingMovies({
        page: currentPage.current,
        reload: false,
      });
    }
  };

  // TODO: Clean subscription here
  const getFavoritesMovies = useCallback(async () => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, COLLECTION_NAME),
      (querySnapshot) => {
        const retrievedMovies: Movie[] = querySnapshot.docs.map(
          mapFromFirebaseDocToMovie
        );

        setFavoriteMovies(retrievedMovies);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const sortFavoritesMovies = async (
    value: GetNowPlayingMoviesDTO["sortBy"] = "popularity.desc"
  ) => {
    const sortByOptions: Record<
      Exclude<GetNowPlayingMoviesDTO["sortBy"], undefined>,
      { property: string; order: OrderByDirection }
    > = {
      "popularity.desc": {
        property: "vote_average",
        order: "desc",
      },
      "original_title.asc": {
        property: "title",
        order: "asc",
      },
      "release_date.desc": {
        property: "release_date",
        order: "desc",
      },
    };
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy(sortByOptions[value].property, sortByOptions[value].order)
    );

    setIsLoading(true);

    const querySnapshot = await getDocs(q);

    const sortedMovies = querySnapshot.docs.map(mapFromFirebaseDocToMovie);

    setFavoriteMovies(sortedMovies);
    setIsLoading(false);
  };

  useEffect(() => {
    switch (view) {
      case "now_playing":
        getNowPlayingMovies({});
        break;

      case "favorites":
        getFavoritesMovies();
        break;
    }
  }, []);

  return {
    movies,
    favoriteMovies,
    isLoading,
    searchMovie,
    getNowPlayingMovies,
    fetchMoreMovies,
    getFavoritesMovies,
    sortFavoritesMovies,
  };
}

function mapFromFirebaseDocToMovie(doc: QueryDocumentSnapshot<DocumentData>) {
  return {
    id: doc.data().id,
    title: doc.data().title,
    overview: doc.data().overview,
    release_date: doc.data().release_date,
    vote_average: doc.data().vote_average,
    poster_path: doc.data().poster_path,
  };
}
