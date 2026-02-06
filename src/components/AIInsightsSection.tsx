import React from "react";
import { View, StyleSheet } from "react-native";
import { AIInsight } from "../types";
import SectionHeader from "./SectionHeader";
import AIInsightCard from "./AIInsightCard";

interface AIInsightsSectionProps {
  insights: AIInsight[];
  onSeeAllPress: () => void;
  onInsightPress: (insight: AIInsight) => void;
  maxItems?: number;
}

export default function AIInsightsSection({
  insights,
  onSeeAllPress,
  onInsightPress,
  maxItems = 2,
}: AIInsightsSectionProps) {
  if (insights.length === 0) {
    return null;
  }

  const displayedInsights = insights.slice(0, maxItems);

  return (
    <View style={styles.container}>
      <SectionHeader
        title="AI Insights"
        onSeeAllPress={onSeeAllPress}
        showSeeAll={insights.length >= maxItems}
      />
      {displayedInsights.map((insight) => (
        <AIInsightCard
          key={insight.id}
          insight={insight}
          onPress={onInsightPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 8,
  },
});
