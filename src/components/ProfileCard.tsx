import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

interface ProfileCardProps {
  firstName: string;
  lastName: string;
  username: string;
  isPremium: boolean;
  onPress: () => void;
}

export default function ProfileCard({
  firstName,
  lastName,
  username,
  isPremium,
  onPress,
}: ProfileCardProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.username}>@{username}</Text>
          {isPremium && (
            <>
              <Text style={styles.dot}>•</Text>
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={12} color={Colors.warning} />
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Chevron */}
      <Ionicons
        name="chevron-forward"
        size={20}
        color={Colors.textTertiary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: Colors.border,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  dot: {
    fontSize: 14,
    color: Colors.textTertiary,
    marginHorizontal: 6,
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  premiumText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.warning,
  },
});
