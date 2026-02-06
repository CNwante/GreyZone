import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export default function EmptyNotifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🔔</Text>
      <Text style={styles.title}>No Notifications</Text>
      <Text style={styles.subtitle}>
        You're all caught up! We'll notify you when something important happens.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: Colors.background,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 280,
  },
});
