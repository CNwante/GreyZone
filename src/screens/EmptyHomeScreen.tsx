import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootTabParamList, MarketMover } from "../types";
import { Colors } from "../constants/colors";
import Header from "../components/Header";
import MarketMovers from "../components/MarketMovers";
import { mockEmptyData } from "../data/mockHomeData";

type EmptyHomeScreenNavigationProp =
  NativeStackNavigationProp<RootTabParamList>;

export default function EmptyHomeScreen() {
  const navigation = useNavigation<EmptyHomeScreenNavigationProp>();

  const handleNotificationPress = () => {
    navigation.navigate("Notifications");
  };

  const handleSettingsPress = () => {
    console.log("Settings pressed");
  };

  const handleConnectWallet = () => {
    console.log("Connect wallet pressed");
    // TODO: Navigate to wallet connection flow
  };

  const handleAddManually = () => {
    console.log("Add manually pressed");
    // TODO: Navigate to manual coin addition
  };

  const handleSeeAllMovers = () => {
    console.log("See all market movers pressed");
    // TODO: Navigate to Market screen
  };

  const handleMoverPress = (mover: MarketMover) => {
    console.log("Market mover pressed:", mover.name);
    // TODO: Navigate to CoinDetail screen
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header
        user={mockEmptyData.user}
        onNotificationPress={handleNotificationPress}
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Empty State Illustration */}
        <View style={styles.emptyStateContainer}>
          <View style={styles.illustrationContainer}>
            <Text style={styles.illustration}>📊</Text>
            <Text style={styles.illustrationAccent}>🪙</Text>
          </View>

          <Text style={styles.title}>No Portfolio Yet</Text>
          <Text style={styles.subtitle}>
            Connect your wallet or add coins manually to start tracking your
            crypto portfolio
          </Text>

          {/* Primary Action Button */}
          <Pressable
            onPress={handleConnectWallet}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>🔗 Connect Wallet</Text>
          </Pressable>

          {/* Secondary Action Button */}
          <Pressable
            onPress={handleAddManually}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryButtonPressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>➕ Add Manually</Text>
          </Pressable>
        </View>

        {/* Market Movers for Discovery */}
        <View style={styles.marketSection}>
          <MarketMovers
            movers={mockEmptyData.marketMovers}
            onSeeAllPress={handleSeeAllMovers}
            onMoverPress={handleMoverPress}
          />
        </View>

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
  scrollContent: {
    flexGrow: 1,
  },

  // Empty State
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
    minHeight: 500,
  },

  // Illustration
  illustrationContainer: {
    position: "relative",
    width: 120,
    height: 120,
    marginBottom: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    fontSize: 80,
  },
  illustrationAccent: {
    fontSize: 40,
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  // Text
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: 320,
  },

  // Primary Button
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  // Secondary Button
  secondaryButton: {
    backgroundColor: Colors.backgroundCard,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  // Market Section
  marketSection: {
    marginTop: 40,
  },

  // Bottom Spacing
  bottomSpacer: {
    height: 24,
  },
});
