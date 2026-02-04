import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootTabParamList, Holding } from "../types";
import { Colors } from "../constants/colors";
import Header from "../components/Header";
import PortfolioCard from "../components/PortfolioCard";
import QuickActions from "../components/QuickActions";
import HoldingsList from "../components/HoldingsList";
import { mockHomeData } from "../data/mockHomeData";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootTabParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNotificationPress = () => {
    navigation.navigate("Notifications");
  };

  const handleSettingsPress = () => {
    // TODO: navigate to settings in future
    console.log("Settings pressed");
  };

  const handlePortfolioPress = () => {
    navigation.navigate("Portfolio");
  };

  // Quick Actions Handlers
  const handleSendPress = () => {
    console.log("Send pressed");
    // TODO: Navigate to Send screen in future
  };

  const handleReceivePress = () => {
    console.log("Receive pressed");
    // TODO: Navigate to Receive screen in future
  };

  const handleSwapPress = () => {
    console.log("Swap pressed");
    // TODO: Navigate to Swap screen in future
  };

  const handleBuyPress = () => {
    console.log("Buy pressed");
    // TODO: Navigate to Buy screen in future
  };

  // Holdings Handlers
  const handleSeeAllHoldings = () => {
    navigation.navigate("Portfolio");
    console.log("See all holdings pressed");
  };

  const handleHoldingPress = (holding: Holding) => {
    console.log("Holding pressed:", holding.name);
    // TODO: Navigate to CoinDetail screen in future
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header
        user={mockHomeData.user}
        onNotificationPress={handleNotificationPress}
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        <HoldingsList
          holdings={mockHomeData.holdings}
          onSeeAllPress={handleSeeAllHoldings}
          onHoldingPress={handleHoldingPress}
          maxItems={3}
        />

        <View style={styles.placeholder}>
          <Text style={styles.subtitle}>Market Movers coming in soon</Text>
        </View>
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
  placeholder: {
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
