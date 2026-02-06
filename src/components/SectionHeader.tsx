import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

interface SectionHeaderProps {
  title: string;
  onSeeAllPress?: () => void;
  showSeeAll?: boolean;
}

export default function SectionHeader({
  title,
  onSeeAllPress,
  showSeeAll = true,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showSeeAll && onSeeAllPress && (
        <Pressable
          onPress={onSeeAllPress}
          style={({ pressed }) => [
            styles.seeAllButton,
            pressed && styles.seeAllButtonPressed,
          ]}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
        </Pressable>
      )}
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
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllButtonPressed: {
    opacity: 0.6,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.primary,
  },
});
