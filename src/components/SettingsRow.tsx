import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

interface SettingsRowProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  label: string;
  value?: string;
  showChevron?: boolean;
  onPress?: () => void;
  isDanger?: boolean;
}

export default function SettingsRow({
  icon,
  iconColor = Colors.textSecondary,
  label,
  value,
  showChevron = true,
  onPress,
  isDanger = false,
}: SettingsRowProps) {
  const isDisabled = !onPress;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.container,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={22}
          color={isDanger ? Colors.error : iconColor}
          style={styles.icon}
        />
      )}
      
      <Text
        style={[
          styles.label,
          isDanger && styles.dangerText,
          !icon && styles.labelNoIcon,
        ]}
      >
        {label}
      </Text>

      {value && <Text style={styles.value}>{value}</Text>}

      {showChevron && onPress && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={Colors.textTertiary}
          style={styles.chevron}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    marginBottom: 8,
    minHeight: 56,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: Colors.border,
  },
  disabled: {
    opacity: 1,
  },
  icon: {
    marginRight: 12,
    width: 24,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: Colors.textPrimary,
  },
  labelNoIcon: {
    marginLeft: 0,
  },
  dangerText: {
    color: Colors.error,
  },
  value: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  chevron: {
    marginLeft: 4,
  },
});
