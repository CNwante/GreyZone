import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

interface QuickActionsProps {
  onSendPress: () => void;
  onReceivePress: () => void;
  onSwapPress: () => void;
  onBuyPress: () => void;
}

export default function QuickActions({
  onSendPress,
  onReceivePress,
  onSwapPress,
  onBuyPress,
}: QuickActionsProps) {
  return (
    <View style={styles.container}>
      <ActionButton
        icon="arrow-up-outline"
        label="Send"
        onPress={onSendPress}
      />
      <ActionButton
        icon="arrow-down-outline"
        label="Receive"
        onPress={onReceivePress}
      />
      <ActionButton
        icon="swap-horizontal-outline"
        label="Swap"
        onPress={onSwapPress}
      />
      <ActionButton icon="card-outline" label="Buy" onPress={onBuyPress} />
    </View>
  );
}

// Individual Action Button Component
interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

function ActionButton({ icon, label, onPress }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color={Colors.primary} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },

  // Button Styles
  button: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  buttonPressed: {
    opacity: 0.6,
  },

  // Icon Container
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 28,
  },

  // Label
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
});
