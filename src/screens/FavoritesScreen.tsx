import React from "react";
import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { globalStyles } from "../common/styles";
import { useMovies } from "../hooks/useMovies";
import { RootStackParams } from "../navigation/types/root-stack-params";
import { MoviesSection } from "../components/MoviesSection";

export const FavoritesScreen = ({
  navigation,
}: StackScreenProps<RootStackParams, "Movies">) => {
  const { favoriteMovies, isLoading, getFavoritesMovies, sortFavoritesMovies } =
    useMovies("favorites");

  return (
    <View style={[globalStyles.container, styles.container]}>
      <MoviesSection
        navigation={navigation}
        sectionTitle="Favorites Movies"
        movies={favoriteMovies}
        isLoading={isLoading}
        onSortByChange={sortFavoritesMovies}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
});
