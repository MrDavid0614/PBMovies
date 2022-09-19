import React, { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { globalStyles } from "../common/styles";
import { MovieItem } from "./MovieItem";
import { Movie } from "../common/types/Movie";
import { RootStackParams } from "../navigation/types/root-stack-params";
import { EmptyList } from "./EmptyList";
import { Spinner } from "./Spinner";
import { GetNowPlayingMoviesDTO } from "../common/types";
import { OnSortByChangeType, useSort } from "../hooks/useSort";
import { MoviesSectionHeader } from "./MoviesSectionHeader";

type MoviesSectionProps = {
  sectionTitle: string;
  movies: Movie[];
  isLoading?: boolean;
  haveFilter?: boolean;
  navigation: StackNavigationProp<RootStackParams, "Movies", undefined>;
  onSortByChange: OnSortByChangeType;
  onApplyFilters?: (dto: GetNowPlayingMoviesDTO) => Promise<void>;
  fetchMoreMovies?: () => Promise<void>;
};

export const MoviesSection = ({
  sectionTitle,
  movies,
  haveFilter,
  isLoading,
  navigation,
  onSortByChange,
  onApplyFilters,
  fetchMoreMovies,
}: MoviesSectionProps) => {
  const { sortBy, handleOnSortByChange } = useSort(onSortByChange);
  return (
    <View style={globalStyles.moviesContainer}>
      <MoviesSectionHeader
        sectionTitle={sectionTitle}
        sortBy={sortBy}
        haveFilter={haveFilter}
        handleOnSortByChange={handleOnSortByChange}
        handleOnApplyFilters={onApplyFilters}
      />
      {!isLoading ? (
        <FlatList
          data={movies}
          renderItem={({ item: movie }) => (
            <MovieItem
              movie={movie}
              onPress={() => navigation.navigate("MovieDetails", movie)}
            />
          )}
          keyExtractor={(item) => `${item.id}-${new Date()}`}
          onEndReachedThreshold={0.5}
          onEndReached={fetchMoreMovies}
          ListEmptyComponent={EmptyList}
        />
      ) : (
        <Spinner />
      )}
    </View>
  );
};
