import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  RootTabParamList,
  HomeStackParamList,
  AIInsight,
  LoadingState as LoadingStateType,
} from "../types";
import { Colors } from "../constants/colors";
import Header from "../components/Header";
import PortfolioCard from "../components/PortfolioCard";
import QuickActions from "../components/QuickActions";
import AIInsightsSection from "../components/AIInsightsSection";
import HoldingsList from "../components/HoldingsList";
import MarketMovers from "../components/MarketMovers";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyHomeScreen from "./EmptyHomeScreen";
import { mockHomeData } from "../data/mockHomeData";
import { homeScrollEventEmitter } from "../navigation/BottomTabs";

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  BottomTabNavigationProp<RootTabParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);

  // State Management
  const [loadingState, setLoadingState] = useState<LoadingStateType>("loading");
  const [refreshing, setRefreshing] = useState(false);

  // Simulate initial data load
  useEffect(() => {
    loadData();
  }, []);

  // Listen for double-tap scroll-to-top event
  useEffect(() => {
    const unsubscribe = homeScrollEventEmitter.addListener(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      handleRefresh();
    });

    return unsubscribe;
  }, []);

  const loadData = async () => {
    try {
      setLoadingState("loading");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate 10% chance of error (for testing)
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch data");
      }

      setLoadingState("loaded");
    } catch (error) {
      console.error("Error loading data:", error);
      setLoadingState("error");
    }
  };

  const handleRetry = () => {
    loadData();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Navigation Handlers
  const handleNotificationPress = () => {
    navigation.navigate("Notifications");
  };

  const handleSettingsPress = () => {
    navigation.navigate("Profile");
  };

  const handlePortfolioPress = () => {
    navigation.navigate("Portfolio");
  };

  // Quick Actions Handlers
  const handleSendPress = () => {
    navigation.navigate("SendCrypto");
  };

  const handleReceivePress = () => {
    navigation.navigate("ReceiveCrypto");
  };

  const handleSwapPress = () => {
    navigation.navigate("SwapCrypto");
  };

  const handleBuyPress = () => {
    navigation.navigate("BuyCrypto");
  };

  // AI Insights Handlers
  const handleSeeAllInsights = () => {
    navigation.navigate("AI");
  };

  const handleInsightPress = (insight: AIInsight) => {
    console.log("AI Insight pressed:", insight.prediction);
    // TODO: Navigate to AI Insight Detail screen in future
  };

  // Holdings Handlers
  const handleSeeAllHoldings = () => {
    navigation.navigate("Portfolio");
  };

  // Remove handleHoldingPress - let HoldingRow handle navigation

  // Market Movers Handlers
  const handleSeeAllMovers = () => {
    navigation.navigate("MarketDiscovery");
  };

  // Remove handleMoverPress - let MarketMoverCard handle navigation

  // Check for empty portfolio state
  const isEmptyPortfolio = mockHomeData.holdings.length === 0;

  // Render Loading State
  if (loadingState === "loading") {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <LoadingState message="Loading your portfolio..." />
      </SafeAreaView>
    );
  }

  // Render Error State
  if (loadingState === "error") {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ErrorState
          message="Unable to load your portfolio. Please check your connection and try again."
          onRetry={handleRetry}
        />
      </SafeAreaView>
    );
  }

  // Render Empty Portfolio State
  if (isEmptyPortfolio) {
    return <EmptyHomeScreen />;
  }

  // Render Loaded State (Main Content)
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header
        user={mockHomeData.user}
        onNotificationPress={handleNotificationPress}
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        <PortfolioCard
          portfolio={mockHomeData.portfolio}
          onPress={handlePortfolioPress}
        />

        <QuickActions
          onSendPress={handleSendPress}
          onReceivePress={handleReceivePress}
          onSwapPress={handleSwapPress}
          onBuyPress={handleBuyPress}
        />

        {/* AI Insights Section */}
        <AIInsightsSection
          insights={mockHomeData.aiInsights}
          onSeeAllPress={handleSeeAllInsights}
          onInsightPress={handleInsightPress}
          maxItems={2}
        />

        <HoldingsList
          holdings={mockHomeData.holdings}
          onSeeAllPress={handleSeeAllHoldings}
          maxItems={3}
        />

        <MarketMovers
          movers={mockHomeData.marketMovers}
          onSeeAllPress={handleSeeAllMovers}
        />

        {/* Bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  bottomSpacer: {
    height: 24,
  },
});
