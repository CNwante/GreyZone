import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import {
  RugPullWarning,
  getRugPullColor,
  formatTimeAgo,
} from "../data/mockAlertsData";

interface RugPullWarningRowProps {
  warning: RugPullWarning;
  onPress: (warning: RugPullWarning) => void;
}

export default function RugPullWarningRow({
  warning,
  onPress,
}: RugPullWarningRowProps) {
  const handlePress = () => {
    onPress(warning);
  };

  const severityColor = getRugPullColor(warning.severity);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: severityColor + "20" },
        ]}
      >
        <Ionicons name="warning" size={24} color={severityColor} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.coinName}>
            {warning.coinSymbol} - {warning.coinName}
          </Text>
          <View style={[styles.riskBadge, { backgroundColor: severityColor }]}>
            <Text style={styles.riskText}>{warning.riskScore}</Text>
          </View>
        </View>
        <Text style={styles.reason} numberOfLines={2}>
          {warning.reason}
        </Text>
        <Text style={styles.time}>{formatTimeAgo(warning.detectedAt)}</Text>
      </View>

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
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  reason: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
});
