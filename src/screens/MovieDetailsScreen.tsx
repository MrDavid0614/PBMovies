import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Rating } from "react-native-ratings";
import { RootStackParams } from "../navigation/types/root-stack-params";
import { globalStyles } from "../common/styles";
import { MovieItem } from "../components/MovieItem";

export const MovieDetailsScreen = ({
  route,
  navigation,
}: StackScreenProps<RootStackParams, "MovieDetails">) => {
  const movieRef = useRef(route.params);

  useEffect(() => {
    navigation.setOptions({ title: movieRef.current.title });
  }, []);

  return (
    <ScrollView style={[globalStyles.marginHorizontal, styles.container]}>
      <MovieItem
        movie={movieRef.current}
        activeOpacity={1}
        iconStyle={{ top: 15, right: 60 }}
        titleStyle={styles.movieTitle}
        imageStyle={{ left: -10 }}
      />
      <View style={styles.movieContent}>
        <View style={styles.ratingSection}>
          <Rating
            readonly
            startingValue={movieRef.current.vote_average / 2}
            ratingCount={5}
          />
        </View>
        <Text style={styles.movieOverview}>{movieRef.current.overview}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  movieInfoContainer: {
    position: "absolute",
    flex: 1,
    top: 400,
    width: 450,
    backgroundColor: "#fff",
  },
  moviePoster: {
    left: -40,
    width: 450,
    height: 450,
  },
  movieContent: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 50,
  },
  movieTitle: {
    marginTop: 15,
    alignSelf: "stretch",
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  movieOverview: {
    paddingTop: 10,
    fontSize: 15,
  },
  ratingSection: {
    left: 10,
    marginBottom: 15,
  },
});
