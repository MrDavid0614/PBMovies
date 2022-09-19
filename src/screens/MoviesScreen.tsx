import React from "react";
import { FlatList, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { globalStyles } from "../common/styles";
import { useMovies } from "../hooks/useMovies";
import { RootStackParams } from "../navigation/types/root-stack-params";
import { Search } from "../components/Search";
import { MoviesSection } from "../components/MoviesSection";

export const MoviesScreen = ({
  navigation,
}: StackScreenProps<RootStackParams, "Movies">) => {
  const {
    movies,
    isLoading,
    searchMovie,
    getNowPlayingMovies,
    fetchMoreMovies,
  } = useMovies("now_playing");

  return (
    <View style={globalStyles.container}>
      <Search onSearch={searchMovie} />
      <MoviesSection
        navigation={navigation}
        sectionTitle="Now Playing"
        movies={movies}
        isLoading={isLoading}
        onSortByChange={async (value) => {
          await getNowPlayingMovies({ page: 1, sortBy: value });
        }}
        haveFilter
        onApplyFilters={getNowPlayingMovies}
        fetchMoreMovies={fetchMoreMovies}
      />
    </View>
  );
};
