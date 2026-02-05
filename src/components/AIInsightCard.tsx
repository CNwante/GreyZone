import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/colors";
import { AIInsight } from "../types";

interface AIInsightCardProps {
  insight: AIInsight;
  onPress: (insight: AIInsight) => void;
}

export default function AIInsightCard({
  insight,
  onPress,
}: AIInsightCardProps) {
  const handlePress = () => {
    onPress(insight);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.wrapper,
        pressed && styles.wrapperPressed,
      ]}
      onPress={handlePress}
    >
      {/* Gradient Border */}
      <LinearGradient
        colors={[Colors.primary, Colors.success]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        {/* Inner Card Content */}
        <View style={styles.container}>
          {/* AI Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🤖</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Prediction Text */}
            <Text style={styles.prediction}>{insight.prediction}</Text>

            {/* Confidence Bar */}
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>
                Confidence: {insight.confidence}%
              </Text>
              <View style={styles.confidenceBarBackground}>
                <View
                  style={[
                    styles.confidenceBarFill,
                    { width: `${insight.confidence}%` },
                  ]}
                />
              </View>
            </View>

            {/* Description */}
            <Text style={styles.description}>
              Based on technical + sentiment analysis
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  wrapperPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  gradientBorder: {
    borderRadius: 12,
    padding: 2, // Border width
  },
  container: {
    flexDirection: "row",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 10,
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + "1A", // 10% opacity
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  prediction: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  confidenceContainer: {
    marginBottom: 8,
  },
  confidenceLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  confidenceBarBackground: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  confidenceBarFill: {
    height: "100%",
    backgroundColor: Colors.success,
    borderRadius: 3,
  },
  description: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },
});
