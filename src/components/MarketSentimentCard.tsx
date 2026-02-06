import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { MarketSentiment, getFearGreedInfo } from "../data/mockAIPredictions";

interface MarketSentimentCardProps {
  sentiment: MarketSentiment;
  onPress: () => void;
}

export default function MarketSentimentCard({
  sentiment,
  onPress,
}: MarketSentimentCardProps) {
  const fearGreedInfo = getFearGreedInfo(sentiment.fearGreedIndex);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Market Sentiment</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
      </View>

      {/* Fear & Greed Index */}
      <View style={styles.fearGreedContainer}>
        <View style={styles.fearGreedHeader}>
          <Text style={styles.fearGreedLabel}>Fear & Greed Index</Text>
          <View style={[styles.fearGreedBadge, { backgroundColor: fearGreedInfo.color + "20" }]}>
            <Text style={[styles.fearGreedBadgeText, { color: fearGreedInfo.color }]}>
              {fearGreedInfo.label}
            </Text>
          </View>
        </View>

        {/* Gauge */}
        <View style={styles.gaugeContainer}>
          <View style={styles.gauge}>
            <View style={styles.gaugeBackground} />
            <View
              style={[
                styles.gaugeIndicator,
                {
                  left: `${sentiment.fearGreedIndex}%`,
                  backgroundColor: fearGreedInfo.color,
                },
              ]}
            />
          </View>
          <Text style={[styles.gaugeValue, { color: fearGreedInfo.color }]}>
            {sentiment.fearGreedIndex}
          </Text>
        </View>

        <View style={styles.gaugeLabels}>
          <Text style={styles.gaugeLabelText}>Fear</Text>
          <Text style={styles.gaugeLabelText}>Greed</Text>
        </View>
      </View>

      {/* Social Sentiment */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialLabel}>Social Sentiment</Text>
        <View style={styles.socialValue}>
          <Text style={styles.socialText}>{sentiment.socialSentiment}</Text>
          <Ionicons name="trending-up" size={16} color={Colors.success} />
        </View>
      </View>

      {/* Sentiment Breakdown */}
      <View style={styles.sentimentBreakdown}>
        <View style={styles.sentimentRow}>
          <View style={styles.sentimentItem}>
            <View style={[styles.sentimentDot, { backgroundColor: Colors.success }]} />
            <Text style={styles.sentimentText}>Bullish</Text>
          </View>
          <Text style={[styles.sentimentPercent, { color: Colors.success }]}>
            {sentiment.bullishPercentage}%
          </Text>
        </View>

        <View style={styles.sentimentRow}>
          <View style={styles.sentimentItem}>
            <View style={[styles.sentimentDot, { backgroundColor: Colors.error }]} />
            <Text style={styles.sentimentText}>Bearish</Text>
          </View>
          <Text style={[styles.sentimentPercent, { color: Colors.error }]}>
            {sentiment.bearishPercentage}%
          </Text>
        </View>
      </View>

      {/* Trending Topics */}
      <View style={styles.trendingContainer}>
        <Text style={styles.trendingLabel}>Trending Topics</Text>
        <View style={styles.topicsContainer}>
          {sentiment.trendingTopics.map((topic, index) => (
            <View key={index} style={styles.topicChip}>
              <Text style={styles.topicText}>#{topic}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  fearGreedContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  fearGreedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  fearGreedLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  fearGreedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  fearGreedBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  gaugeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  gauge: {
    flex: 1,
    height: 8,
    position: "relative",
  },
  gaugeBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 4,
    backgroundColor: Colors.border,
    overflow: "hidden",
  },
  gaugeIndicator: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    top: -4,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  gaugeValue: {
    fontSize: 18,
    fontWeight: "700",
    minWidth: 40,
    textAlign: "right",
  },
  gaugeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gaugeLabelText: {
    fontSize: 11,
    color: Colors.textTertiary,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  socialLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  socialValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  socialText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  sentimentBreakdown: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 8,
  },
  sentimentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sentimentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sentimentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sentimentText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sentimentPercent: {
    fontSize: 14,
    fontWeight: "700",
  },
  trendingContainer: {
    gap: 8,
  },
  trendingLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textTertiary,
    textTransform: "uppercase",
  },
  topicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topicChip: {
    backgroundColor: Colors.primary + "20",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  topicText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
  },
});
