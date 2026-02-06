import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types";
import PortfolioScreen from "../screens/PortfolioScreen";
import CoinDetailScreen from "../screens/CoinDetailScreen";
import { Colors } from "../constants/colors";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function PortfolioStack() {
  return (
    <Stack.Navigator
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
        component={PortfolioScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CoinDetail"
        component={CoinDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
