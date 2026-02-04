import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Holding } from "../types";
import { Colors } from "../constants/colors";

interface HoldingRowProps {
  holding: Holding;
  onPress: (holding: Holding) => void;
  showSeparator?: boolean;
}

export default function HoldingRow({
  holding,
  onPress,
  showSeparator = true,
}: HoldingRowProps) {
  const isPositive = holding.changePercent24h >= 0;
  const changeColor = isPositive ? Colors.success : Colors.error;
  const changePrefix = isPositive ? "+" : "";

  return (
    <>
      <Pressable
        onPress={() => onPress(holding)}
        style={({ pressed }) => [
          styles.container,
          pressed && styles.containerPressed,
        ]}
      >
        {/* Left Section: Logo + Name/Symbol */}
        <View style={styles.leftSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>{holding.logo}</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{holding.name}</Text>
            <Text style={styles.symbol}>{holding.symbol}</Text>
          </View>
        </View>

        {/* Right Section: Value + Change */}
        <View style={styles.rightSection}>
          <Text style={styles.value}>
            $
            {holding.value.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View style={styles.changeContainer}>
            <Text style={[styles.change, { color: changeColor }]}>
              {changePrefix}
              {holding.changePercent24h.toFixed(2)}%
            </Text>
            <Text style={styles.arrow}>›</Text>
          </View>
        </View>
      </Pressable>

      {showSeparator && <View style={styles.separator} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.background,
  },
  containerPressed: {
    backgroundColor: Colors.backgroundCard,
    opacity: 0.8,
  },

  // Left Section
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  nameContainer: {
    gap: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  symbol: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  // Right Section
  rightSection: {
    alignItems: "flex-end",
    gap: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: "500",
  },
  arrow: {
    fontSize: 16,
    color: Colors.textSecondary,
  },

  // Separator
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 68,
  },
});
