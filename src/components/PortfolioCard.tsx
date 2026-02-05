import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Portfolio } from "../types";
import { Colors } from "../constants/colors";

interface PortfolioCardProps {
  portfolio: Portfolio;
  onPress: () => void;
}

export default function PortfolioCard({
  portfolio,
  onPress,
}: PortfolioCardProps) {
  const isPositive = portfolio.change24h >= 0;
  const changeColor = isPositive ? Colors.success : Colors.error;
  const changePrefix = isPositive ? "+" : "";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      {/* Label */}
      <Text style={styles.label}>Total Portfolio Value</Text>

      {/* Main Value */}
      <Text style={styles.value}>
        $
        {portfolio.totalValue.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>

      {/* 24h Change */}
      <View style={styles.changeContainer}>
        <Text style={[styles.changeAmount, { color: changeColor }]}>
          {changePrefix}$
          {Math.abs(portfolio.change24h).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
        <Text style={[styles.changePercent, { color: changeColor }]}>
          ({changePrefix}
          {portfolio.changePercent24h.toFixed(2)}%)
        </Text>
      </View>

      {/* Sparkline Placeholder */}
      {portfolio.chartData.length > 0 && (
        <View style={styles.chartContainer}>
          <SparklinePlaceholder
            data={portfolio.chartData}
            isPositive={isPositive}
          />
        </View>
      )}
    </Pressable>
  );
}

// Simple sparkline visualization using bars
interface SparklinePlaceholderProps {
  data: number[];
  isPositive: boolean;
}

function SparklinePlaceholder({ data, isPositive }: SparklinePlaceholderProps) {
  // Always use primary blue for sparkline per spec
  const color = Colors.primary;

  // Normalize data to fit in container
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  return (
    <View style={styles.sparkline}>
      {data.map((value, index) => {
        // Calculate height as percentage (0-100%)
        const normalizedHeight = range > 0 ? ((value - min) / range) * 100 : 50;

        return (
          <View
            key={index}
            style={[
              styles.sparklineBar,
              {
                height: `${Math.max(normalizedHeight, 10)}%`, // Minimum 10% height
                backgroundColor: color,
                opacity: 0.4 + (normalizedHeight / 100) * 0.6, // Vary opacity (40-100%)
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  containerPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },

  // Label
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: "500",
  },

  // Main Value
  value: {
    fontSize: 40,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -1,
  },

  // Change Container
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  changeAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  changePercent: {
    fontSize: 16,
    fontWeight: "600",
  },

  // Chart/Sparkline
  chartContainer: {
    marginTop: 8,
  },
  sparkline: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 60,
    gap: 2,
    paddingHorizontal: 2,
  },
  sparklineBar: {
    width: 8,
    borderRadius: 2,
    minHeight: 4,
  },
});
