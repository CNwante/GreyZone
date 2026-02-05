import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RootTabParamList } from "../types";
import HomeStack from "./HomeStack";
import NotificationsScreen from "../screens/NotificationsScreen";
import PlaceholderScreen from "../screens/PlaceholderScreen";
import { Colors } from "../constants/colors";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.backgroundCard,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Portfolio"
        children={() => <PlaceholderScreen title="Portfolio" />}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "pie-chart" : "pie-chart-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Portfolio",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.textPrimary,
        }}
      />
      <Tab.Screen
        name="AI"
        children={() => <PlaceholderScreen title="AI Insights" />}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "sparkles" : "sparkles-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "AI",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.textPrimary,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Alerts",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.textPrimary,
          headerTitle: "Notifications",
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <PlaceholderScreen title="Profile" />}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Profile",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.textPrimary,
        }}
      />
    </Tab.Navigator>
  );
}
