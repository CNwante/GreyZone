import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingsSection({
  title,
  children,
}: SettingsSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  content: {
    // Children will be SettingsRow components
  },
});
