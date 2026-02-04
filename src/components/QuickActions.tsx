import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
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
      <ActionButton icon="📤" label="Send" onPress={onSendPress} />
      <ActionButton icon="📥" label="Receive" onPress={onReceivePress} />
      <ActionButton icon="🔄" label="Swap" onPress={onSwapPress} />
      <ActionButton icon="💵" label="Buy" onPress={onBuyPress} />
    </View>
  );
}

// Individual Action Button Component
interface ActionButtonProps {
  icon: string;
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
        <Text style={styles.icon}>{icon}</Text>
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
