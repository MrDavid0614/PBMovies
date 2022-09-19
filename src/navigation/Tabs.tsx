import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabsParams } from "./types/root-tabs-params";
import { MoviesScreen } from "../screens/MoviesScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { Star } from "../components/Star";

const movieIcon = require("../../assets/movie.png");
const starIcon = require("../../assets/star.png");

const TabsNav = createBottomTabNavigator<RootTabsParams>();

export const Tabs = () => {
  return (
    <TabsNav.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
    >
      <TabsNav.Screen
        name="MoviesList"
        component={MoviesScreen}
        options={{
          title: "Movies List",
          tabBarActiveTintColor: "red",
          tabBarIcon: (props) => (
            <Image
              source={movieIcon}
              style={{
                width: props.size,
                height: props.size,
                tintColor: props.color,
              }}
            />
          ),
        }}
      />
      <TabsNav.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          tabBarIcon: (props) => (
            <Image
              source={starIcon}
              style={{
                width: props.size,
                height: props.size,
                tintColor: props.color,
              }}
            />
          ),
          tabBarActiveTintColor: "#FFCD01",
        }}
      />
    </TabsNav.Navigator>
  );
};
