import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleProp,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";
import { TMDB_IMAGES_BASE_URL } from "../../common/constants";
import { Movie } from "../../common/types/Movie";
import { useFavoritesMoviesContext } from "../../context/FavoriteMoviesContext";
import { Star } from "../Star";

type MovieItemProps = {
  movie: Movie;
  activeOpacity?: number;
  imageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const MovieItem = ({
  movie,
  activeOpacity = 0.85,
  imageStyle,
  titleStyle,
  iconStyle,
  onPress,
}: MovieItemProps) => {
  const { favoriteMovies, saveFavoriteMovie, deleteFavoriteMovie } =
    useFavoritesMoviesContext();
  const isFavoriteMovie = useMemo(() => {
    return !!favoriteMovies.find(({ id }) => id === movie.id);
  }, [movie, favoriteMovies]);

  const handleOnPressStar = () => {
    if (!isFavoriteMovie) return saveFavoriteMovie(movie);

    deleteFavoriteMovie(movie.id);
  };

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
      <View style={styles.container}>
        <Star
          selected={isFavoriteMovie}
          onPress={handleOnPressStar}
          containerStyle={[styles.favoriteIndicator, iconStyle]}
        />
        <Image
          source={{ uri: `${TMDB_IMAGES_BASE_URL}${movie.poster_path}` }}
          resizeMode="contain"
          style={[styles.image, imageStyle]}
          accessibilityLabel={`${movie.title} poster`}
        />
        <Text style={[styles.movieTitle, titleStyle]}>{movie.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 400,
  },
  movieTitle: {
    marginTop: 10,
    fontSize: 20,
    alignSelf: "center",
  },
  favoriteIndicator: {
    position: "absolute",
    top: 15,
    right: 85,
    zIndex: 1,
  },
});
