import axios from "axios";
import Constants from "expo-constants";
import { Alert } from "react-native";
import { TMDB_API_BASE_URL } from "../constants";
import { ApiPaginatedResponse } from "../types/ApiPaginatedResponse";
import {
  Movie,
  GetNowPlayingMoviesDTO,
  SearchMovieDTO,
  MovieCategory,
} from "../types";

const movieDB = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_TMDB_APIKEY || "",
  },
});

export class MoviesService {
  async getNowPlaying({
    page = 1,
    sortBy = "popularity.desc",
    withGenres,
  }: GetNowPlayingMoviesDTO) {
    try {
      const params = {
        page,
        sort_by: sortBy,
        ...(withGenres && withGenres.length
          ? { with_genres: withGenres.join() }
          : {}),
      };
      const { data } = await movieDB.get<ApiPaginatedResponse<Movie>>(
        `${TMDB_API_BASE_URL}/discover/movie`,
        {
          params,
        }
      );

      return data;
    } catch (error) {
      const errorAsAny = error as any;
      Alert.alert(
        errorAsAny?.message,
        "There was an error while trying to get the movies list."
      );

      return null;
    }
  }

  async search({ title }: SearchMovieDTO) {
    try {
      const { data } = await movieDB.get<ApiPaginatedResponse<Movie>>(
        "/search/movie",
        { params: { query: title } }
      );

      return data;
    } catch (error) {
      const errorAsAny = error as any;
      Alert.alert(
        errorAsAny?.message,
        "There was an error while trying to get the movies list."
      );

      return null;
    }
  }

  async getCategories() {
    try {
      const { data } = await movieDB.get<{ genres: MovieCategory[] }>(
        "/genre/movie/list"
      );

      return data;
    } catch (error) {
      const errorAsAny = error as any;
      Alert.alert(
        errorAsAny?.message,
        "There was an error while trying to get the movies list."
      );

      return null;
    }
  }
}
