import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import EmptyHomeScreen from "../screens/EmptyHomeScreen";
import { Colors } from "../constants/colors";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const isNewUser = false;

  return (
    <Stack.Navigator
      initialRouteName={isNewUser ? "EmptyHome" : "HomeMain"}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EmptyHome"
        component={EmptyHomeScreen}
        options={{ headerShown: false }}
      />

      {/* TODO: Additional screens will be added in later phases:
          - CoinDetail
          - AIInsightDetail
      */}
    </Stack.Navigator>
  );
}
