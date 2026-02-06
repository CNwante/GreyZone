import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/colors";
import AIPredictionCard from "../components/AIPredictionCard";
import MarketSentimentCard from "../components/MarketSentimentCard";
import {
  AIPrediction,
  mockAIPredictions,
  mockMarketSentiment,
  filterPredictionsBySentiment,
  filterUserCoinPredictions,
  PredictionSentiment,
} from "../data/mockAIPredictions";

type FilterTab = "all" | "bullish" | "bearish" | "yourCoins";

export default function AIPredictionsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>("all");
  const [refreshing, setRefreshing] = useState(false);
  const [predictions, setPredictions] =
    useState<AIPrediction[]>(mockAIPredictions);

  // Filter predictions based on selected tab
  const getFilteredPredictions = (): AIPrediction[] => {
    switch (selectedFilter) {
      case "bullish":
        return filterPredictionsBySentiment(predictions, "bullish");
      case "bearish":
        return filterPredictionsBySentiment(predictions, "bearish");
      case "yourCoins":
        return filterUserCoinPredictions(predictions);
      default:
        return predictions;
    }
  };

  const filteredPredictions = getFilteredPredictions();

  // Get counts for each filter
  const filterCounts = {
    all: predictions.length,
    bullish: filterPredictionsBySentiment(predictions, "bullish").length,
    bearish: filterPredictionsBySentiment(predictions, "bearish").length,
    yourCoins: filterUserCoinPredictions(predictions).length,
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handlePredictionPress = (prediction: AIPrediction) => {
    console.log("Navigate to AI-003 (Prediction Detail):", prediction.id);
    // TODO: Navigate to AI-003 (Prediction Detail)
  };

  const handleChatPress = () => {
    console.log("Navigate to AI-001 (AI Chat)");
    // TODO: Navigate to AI-001 (AI Chat)
  };

  const handleSentimentPress = () => {
    console.log("Navigate to NEWS-003 (Sentiment Overview)");
    // TODO: Navigate to NEWS-003 (Sentiment Overview)
  };

  const renderFilterTab = (filter: FilterTab, label: string, count: number) => {
    const isSelected = selectedFilter === filter;
    return (
      <Pressable
        key={filter}
        onPress={() => setSelectedFilter(filter)}
        style={[styles.filterTab, isSelected && styles.filterTabActive]}
      >
        <Text
          style={[styles.filterText, isSelected && styles.filterTextActive]}
        >
          {label}
        </Text>
        <View
          style={[styles.filterBadge, isSelected && styles.filterBadgeActive]}
        >
          <Text
            style={[
              styles.filterBadgeText,
              isSelected && styles.filterBadgeTextActive,
            ]}
          >
            {count}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Chat with AI Button */}
      <Pressable
        onPress={handleChatPress}
        style={({ pressed }) => [
          styles.chatButton,
          pressed && styles.chatButtonPressed,
        ]}
      >
        <View style={styles.chatIconContainer}>
          <Ionicons
            name="chatbubble-ellipses"
            size={24}
            color={Colors.textPrimary}
          />
        </View>
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatTitle}>Chat with AI</Text>
          <Text style={styles.chatSubtitle}>Ask about any coin or market</Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={Colors.textTertiary}
        />
      </Pressable>

      {/* Filter Tabs - Horizontal Scroll with Fade Indicator */}
      <View style={styles.filterWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
          style={styles.filterContainer}
        >
          {renderFilterTab("all", "All", filterCounts.all)}
          {renderFilterTab("bullish", "Bullish", filterCounts.bullish)}
          {renderFilterTab("bearish", "Bearish", filterCounts.bearish)}
          {renderFilterTab("yourCoins", "Your Coins", filterCounts.yourCoins)}
        </ScrollView>

        <LinearGradient
          colors={["transparent", Colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.filterFadeGradient}
          pointerEvents="none"
        />
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Top Predictions</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <MarketSentimentCard
        sentiment={mockMarketSentiment}
        onPress={handleSentimentPress}
      />

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={24} color={Colors.primary} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>About AI Predictions</Text>
          <Text style={styles.infoText}>
            Our AI analyzes technical indicators, on-chain data, social
            sentiment, and market trends to generate predictions. Higher
            confidence scores indicate stronger signals.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="analytics-outline"
        size={64}
        color={Colors.textTertiary}
      />
      <Text style={styles.emptyTitle}>No Predictions</Text>
      <Text style={styles.emptySubtitle}>
        {selectedFilter === "yourCoins"
          ? "Add coins to your portfolio to see personalized predictions"
          : "Check back soon for new AI insights"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Insights</Text>
      </View>

      {/* Predictions List */}
      <FlatList
        data={filteredPredictions}
        renderItem={({ item }) => (
          <AIPredictionCard prediction={item} onPress={handlePredictionPress} />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  listContent: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  chatButtonPressed: {
    opacity: 0.8,
  },
  chatIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  chatTextContainer: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  chatSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  filterWrapper: {
    position: "relative",
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterScrollContent: {
    gap: 8,
    paddingRight: 16,
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 100,
  },
  filterTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.textPrimary,
  },
  filterBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  filterBadgeActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  filterBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.textTertiary,
  },
  filterBadgeTextActive: {
    color: Colors.textPrimary,
  },
  filterFadeGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  footerContainer: {
    marginTop: 8,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: Colors.primary + "15",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});
