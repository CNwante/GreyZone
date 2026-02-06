import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../constants/colors";
import SettingsScreen from "../screens/SettingsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SecuritySettingsScreen from "../screens/SecuritySettingsScreen";
import NotificationSettingsScreen from "../screens/NotificationSettingsScreen";

export type SettingsStackParamList = {
  SettingsMain: undefined;
  EditProfile: undefined;
  SecuritySettings: undefined;
  NotificationSettings: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
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
        name="SettingsMain"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "Edit Profile",
        }}
      />

      <Stack.Screen
        name="SecuritySettings"
        component={SecuritySettingsScreen}
        options={{
          headerShown: true,
          headerTitle: "Security",
        }}
      />

      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{
          headerShown: true,
          headerTitle: "Notifications",
        }}
      />
    </Stack.Navigator>
  );
}
