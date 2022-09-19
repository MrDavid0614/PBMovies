import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Spinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
