import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "../types";
import { Colors } from "../constants/colors";

interface HeaderProps {
  user: User;
  onNotificationPress: () => void;
  onSettingsPress: () => void;
  onAvatarPress?: () => void;
}

export default function Header({
  user,
  onNotificationPress,
  onSettingsPress,
  onAvatarPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {/* Left Section: Avatar + Greeting - NOW TAPPABLE */}
      <Pressable
        onPress={onAvatarPress || onSettingsPress}
        style={({ pressed }) => [
          styles.leftSection,
          pressed && styles.leftSectionPressed,
        ]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.firstName[0].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.greeting}>Hi, {user.firstName}</Text>
      </Pressable>

      {/* Right Section: Notification Bell + Settings */}
      <View style={styles.rightSection}>
        {/* Notification Bell */}
        <Pressable
          onPress={onNotificationPress}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={Colors.textPrimary}
          />
          {user.unreadNotifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {user.unreadNotifications > 9 ? "9+" : user.unreadNotifications}
              </Text>
            </View>
          )}
        </Pressable>

        {/* Settings Icon */}
        <Pressable
          onPress={onSettingsPress}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color={Colors.textPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },

  // Left Section
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  leftSectionPressed: {
    opacity: 0.6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: "600",
  },
  greeting: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: "500",
  },

  // Right Section
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    position: "relative",
    padding: 4,
  },
  iconButtonPressed: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 24,
  },

  // Notification Badge
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.badgeBackground,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  badgeText: {
    color: Colors.badgeText,
    fontSize: 10,
    fontWeight: "700",
  },
});
