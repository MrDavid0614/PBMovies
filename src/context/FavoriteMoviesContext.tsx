import {
  addDoc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import React, { createContext, useContext } from "react";
import { db } from "../database/firebase";
import { useMovies } from "../hooks/useMovies";
import { COLLECTION_NAME } from "../common/constants";
import { Movie } from "../common/types/Movie";

type FavoriteMoviesContextType = {
  favoriteMovies: Movie[];
  saveFavoriteMovie: (movie: Movie) => void;
  deleteFavoriteMovie: (id: string) => void;
};

type FavoriteMoviesContextProviderProps = {
  children: React.ReactNode;
};

const FavoriteMoviesContext = createContext<FavoriteMoviesContextType>({
  favoriteMovies: [],
  saveFavoriteMovie: () => {},
  deleteFavoriteMovie: () => {},
});

export const useFavoritesMoviesContext = () =>
  useContext(FavoriteMoviesContext);

export const FavoriteMoviesContextProvider = ({
  children,
}: FavoriteMoviesContextProviderProps) => {
  const { favoriteMovies } = useMovies("favorites");

  const saveFavoriteMovie = async (movie: Movie) => {
    try {
      await addDoc(collection(db, COLLECTION_NAME), movie);
    } catch (error) {
      console.error(
        "There was an error while adding this movie as favorite: ",
        error
      );
    }
  };

  const deleteFavoriteMovie = async (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), where("id", "==", id));
    const querySnapshot = await getDocs(q);

    const favoriteMovieToDelete = querySnapshot.docs.find(
      (doc) => doc.data().id === id
    );
    if (favoriteMovieToDelete) deleteDoc(favoriteMovieToDelete.ref);
  };

  return (
    <FavoriteMoviesContext.Provider
      value={{
        favoriteMovies,
        saveFavoriteMovie,
        deleteFavoriteMovie,
      }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  );
};
