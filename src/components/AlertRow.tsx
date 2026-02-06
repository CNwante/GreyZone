import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import {
  Alert,
  getAlertIcon,
  getAlertColor,
  formatTimeAgo,
} from "../data/mockAlertsData";

interface AlertRowProps {
  alert: Alert;
  onPress: (alert: Alert) => void;
}

export default function AlertRow({ alert, onPress }: AlertRowProps) {
  const handlePress = () => {
    onPress(alert);
  };

  const iconName = getAlertIcon(alert.condition);
  const iconColor = getAlertColor(alert.condition);
  const isTriggered = alert.status === "triggered";

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: iconColor + "20" },
          isTriggered && styles.triggeredIcon,
        ]}
      >
        <Text style={styles.coinLogo}>{alert.coinLogo}</Text>
        <View style={[styles.statusIcon, { backgroundColor: iconColor }]}>
          <Ionicons
            name={iconName as any}
            size={10}
            color={Colors.textPrimary}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.message}>{alert.message}</Text>
        <Text style={styles.description}>
          {alert.type === "price" ? "Price alert" : "Percentage alert"} •{" "}
          {isTriggered ? "Triggered" : "Active"}
        </Text>
        <Text style={styles.time}>
          {isTriggered && alert.triggeredAt
            ? `Triggered ${formatTimeAgo(alert.triggeredAt)}`
            : `Created ${formatTimeAgo(alert.createdAt)}`}
        </Text>
      </View>

      {isTriggered && (
        <View style={styles.triggeredBadge}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
        </View>
      )}

      <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    position: "relative",
  },
  triggeredIcon: {
    opacity: 0.6,
  },
  coinLogo: {
    fontSize: 24,
  },
  statusIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.backgroundCard,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 8,
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
  triggeredBadge: {
    marginRight: 8,
  },
});
