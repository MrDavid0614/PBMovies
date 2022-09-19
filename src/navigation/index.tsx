import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParams } from "./types/root-stack-params";
import { Tabs } from "./Tabs";
import { MovieDetailsScreen } from "../screens/MovieDetailsScreen";

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Movies" component={Tabs} />
    <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
  </Stack.Navigator>
);
