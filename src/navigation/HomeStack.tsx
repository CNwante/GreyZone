import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import EmptyHomeScreen from "../screens/EmptyHomeScreen";
import CoinDetailScreen from "../screens/CoinDetailScreen";
import MarketDiscoveryScreen from "../screens/MarketDiscoveryScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SendCryptoScreen from "../screens/SendCryptoScreen";
import ReceiveCryptoScreen from "../screens/ReceiveCryptoScreen";
import SwapScreen from "../screens/SwapScreen";
import BuyCryptoScreen from "../screens/BuyCryptoScreen";
import SendConfirmationScreen from "../screens/SendConfirmationScreen";
import SwapConfirmationScreen from "../screens/SwapConfirmationScreen";
import TransactionSuccessScreen from "../screens/TransactionSuccessScreen";
import TransactionErrorScreen from "../screens/TransactionErrorScreen";
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

      <Stack.Screen
        name="CoinDetail"
        component={CoinDetailScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MarketDiscovery"
        component={MarketDiscoveryScreen}
        options={{
          headerShown: true,
          headerTitle: "Market",
        }}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Wallet Screens */}
      <Stack.Screen
        name="SendCrypto"
        component={SendCryptoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ReceiveCrypto"
        component={ReceiveCryptoScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SwapCrypto"
        component={SwapScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="BuyCrypto"
        component={BuyCryptoScreen}
        options={{ headerShown: false }}
      />

      {/* Confirmation Screens */}
      <Stack.Screen
        name="SendConfirmation"
        component={SendConfirmationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SwapConfirmation"
        component={SwapConfirmationScreen}
        options={{ headerShown: false }}
      />

      {/* Result Screens */}
      <Stack.Screen
        name="TransactionSuccess"
        component={TransactionSuccessScreen}
        options={{
          headerShown: false,
          gestureEnabled: false, // Prevent swipe back
        }}
      />

      <Stack.Screen
        name="TransactionError"
        component={TransactionErrorScreen}
        options={{
          headerShown: false,
          gestureEnabled: false, // Prevent swipe back
        }}
      />

      {/* TODO: Additional screens will be added in later phases:
          - AIInsightDetail
      */}
    </Stack.Navigator>
  );
}
