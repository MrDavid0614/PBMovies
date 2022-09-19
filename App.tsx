import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./src/navigation";
import { FavoriteMoviesContextProvider } from "./src/context/FavoriteMoviesContext";

export default function App() {
  return (
    <NavigationContainer>
      <FavoriteMoviesContextProvider>
        <StackNavigator />
      </FavoriteMoviesContextProvider>
    </NavigationContainer>
  );
}
