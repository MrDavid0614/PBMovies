import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No movies found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 19,
  },
});
