import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import {
  AIPrediction,
  getSentimentColor,
  getSentimentIcon,
  getConfidenceColor,
  formatTimeframe,
  formatPredictionTime,
} from "../data/mockAIPredictions";

interface AIPredictionCardProps {
  prediction: AIPrediction;
  onPress: (prediction: AIPrediction) => void;
}

export default function AIPredictionCard({
  prediction,
  onPress,
}: AIPredictionCardProps) {
  const handlePress = () => {
    onPress(prediction);
  };

  const sentimentColor = getSentimentColor(prediction.sentiment);
  const sentimentIcon = getSentimentIcon(prediction.sentiment);
  const confidenceColor = getConfidenceColor(prediction.confidence);
  const isPositive = prediction.priceChangePercent > 0;

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.coinInfo}>
          <Text style={styles.coinLogo}>{prediction.coinLogo}</Text>
          <View>
            <Text style={styles.coinSymbol}>{prediction.coinSymbol}</Text>
            <Text style={styles.coinName}>{prediction.coinName}</Text>
          </View>
        </View>
        <View style={[styles.sentimentBadge, { backgroundColor: sentimentColor + "20" }]}>
          <Ionicons name={sentimentIcon as any} size={14} color={sentimentColor} />
          <Text style={[styles.sentimentText, { color: sentimentColor }]}>
            {prediction.sentiment}
          </Text>
        </View>
      </View>

      {/* Prediction */}
      <Text style={styles.prediction}>{prediction.prediction}</Text>

      {/* Price Info */}
      <View style={styles.priceInfo}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Current:</Text>
          <Text style={styles.priceValue}>
            ${prediction.currentPrice.toLocaleString()}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Target:</Text>
          <Text style={[styles.priceValue, { color: sentimentColor }]}>
            ${prediction.targetPrice.toLocaleString()}
          </Text>
        </View>
        <View style={styles.changeContainer}>
          <Ionicons
            name={isPositive ? "arrow-up" : "arrow-down"}
            size={16}
            color={isPositive ? Colors.success : Colors.error}
          />
          <Text
            style={[
              styles.changeText,
              { color: isPositive ? Colors.success : Colors.error },
            ]}
          >
            {isPositive ? "+" : ""}
            {prediction.priceChangePercent.toFixed(2)}%
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceLabel}>Confidence:</Text>
          <View style={styles.confidenceBar}>
            <View
              style={[
                styles.confidenceFill,
                {
                  width: `${prediction.confidence}%`,
                  backgroundColor: confidenceColor,
                },
              ]}
            />
          </View>
          <Text style={[styles.confidenceValue, { color: confidenceColor }]}>
            {prediction.confidence}%
          </Text>
        </View>
        <View style={styles.metaInfo}>
          <Text style={styles.timeframe}>
            {formatTimeframe(prediction.timeframe)}
          </Text>
          <Text style={styles.timestamp}>
            {formatPredictionTime(prediction.createdAt)}
          </Text>
        </View>
      </View>

      {/* Your Coin Badge */}
      {prediction.isYourCoin && (
        <View style={styles.yourCoinBadge}>
          <Ionicons name="wallet" size={12} color={Colors.primary} />
          <Text style={styles.yourCoinText}>Your coin</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  coinInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  coinLogo: {
    fontSize: 32,
  },
  coinSymbol: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  coinName: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  sentimentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  sentimentText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  prediction: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 12,
    lineHeight: 20,
  },
  priceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  priceRow: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  footer: {
    gap: 8,
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  confidenceLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  confidenceBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    borderRadius: 3,
  },
  confidenceValue: {
    fontSize: 12,
    fontWeight: "700",
    minWidth: 40,
    textAlign: "right",
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeframe: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  timestamp: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  yourCoinBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.primary + "20",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  yourCoinText: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.primary,
  },
});
