import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../constants/colors";
import { getCoinDataById, CoinDetail } from "../data/mockCoinData";
import { RootTabParamList } from "../types";

const screenWidth = Dimensions.get("window").width;

type TimeRange = "1H" | "24H" | "7D" | "1M" | "3M" | "1Y" | "ALL";

type CoinDetailRouteProp = RouteProp<
  { CoinDetail: { coinId: string } },
  "CoinDetail"
>;

export default function CoinDetailScreen() {
  const route = useRoute<CoinDetailRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  const { coinId } = route.params || { coinId: "bitcoin" };
  const [coinData, setCoinData] = useState<CoinDetail | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("24H");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Load coin data
    const data = getCoinDataById(coinId);
    if (data) {
      setCoinData(data);
      setIsFavorite(data.isFavorite);
    }
  }, [coinId]);

  if (!coinData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Coin not found</Text>
      </SafeAreaView>
    );
  }

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    // TODO: Save to favorites
  };

  const handleAlertPress = () => {
    console.log("Alert pressed");
    // TODO: Navigate to ALERT-002 (Create Alert)
  };

  const handleBuyPress = () => {
    console.log("Buy pressed");
    // TODO: Navigate to TRADE-001 (with coin pre-selected)
  };

  const handleSellPress = () => {
    console.log("Sell pressed");
    // TODO: Navigate to TRADE-001 (sell mode)
  };

  const handleSwapPress = () => {
    console.log("Swap pressed");
    // TODO: Navigate to TRADE-005 (with coin pre-selected)
  };

  const handleAddMorePress = () => {
    console.log("Add more pressed");
    // TODO: Navigate to PORT-002 (Add Holding)
  };

  const priceData = coinData.priceData[selectedTimeRange];
  const priceLabels = coinData.priceLabels[selectedTimeRange];
  const isPositiveChange = coinData.change24h >= 0;

  // Format large numbers
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    return `$${num.toLocaleString()}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <View style={styles.headerTitle}>
          <Text style={styles.coinName}>{coinData.name}</Text>
          <Text style={styles.coinSymbol}>({coinData.symbol})</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable onPress={handleFavoritePress} style={styles.iconButton}>
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              size={24}
              color={isFavorite ? Colors.warning : Colors.textPrimary}
            />
          </Pressable>
          <Pressable onPress={handleAlertPress} style={styles.iconButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.textPrimary}
            />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Price Section */}
        <View style={styles.priceSection}>
          <Text style={styles.price}>
            $
            {coinData.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
          <View style={styles.changeRow}>
            <Ionicons
              name={isPositiveChange ? "trending-up" : "trending-down"}
              size={16}
              color={isPositiveChange ? Colors.success : Colors.error}
            />
            <Text
              style={[
                styles.changeText,
                { color: isPositiveChange ? Colors.success : Colors.error },
              ]}
            >
              ${Math.abs(coinData.change24h).toFixed(2)} (
              {isPositiveChange ? "+" : ""}
              {coinData.changePercent24h.toFixed(2)}%) today
            </Text>
          </View>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          {(["1H", "24H", "7D", "1M", "3M", "1Y", "ALL"] as TimeRange[]).map(
            (range) => (
              <Pressable
                key={range}
                onPress={() => setSelectedTimeRange(range)}
                style={[
                  styles.timeRangeButton,
                  selectedTimeRange === range && styles.timeRangeButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.timeRangeText,
                    selectedTimeRange === range && styles.timeRangeTextActive,
                  ]}
                >
                  {range}
                </Text>
              </Pressable>
            )
          )}
        </View>

        {/* Price Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: priceLabels,
              datasets: [{ data: priceData }],
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: Colors.backgroundCard,
              backgroundGradientFrom: Colors.backgroundCard,
              backgroundGradientTo: Colors.backgroundCard,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(36, 107, 253, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`,
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: Colors.primary,
              },
            }}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withVerticalLines={false}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable onPress={handleBuyPress} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Buy</Text>
          </Pressable>
          <Pressable
            onPress={handleSellPress}
            style={[styles.actionButton, styles.actionButtonSecondary]}
          >
            <Text
              style={[
                styles.actionButtonText,
                styles.actionButtonTextSecondary,
              ]}
            >
              Sell
            </Text>
          </Pressable>
          <Pressable
            onPress={handleSwapPress}
            style={[styles.actionButton, styles.actionButtonSecondary]}
          >
            <Text
              style={[
                styles.actionButtonText,
                styles.actionButtonTextSecondary,
              ]}
            >
              Swap
            </Text>
          </Pressable>
        </View>

        {/* Your Holdings Section (if user owns it) */}
        {coinData.userHolding && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Holdings</Text>
            <View style={styles.card}>
              <View style={styles.holdingRow}>
                <Text style={styles.holdingLabel}>Amount</Text>
                <Text style={styles.holdingValue}>
                  {coinData.userHolding.amount} {coinData.symbol}
                </Text>
              </View>
              <View style={styles.holdingRow}>
                <Text style={styles.holdingLabel}>Value</Text>
                <Text style={styles.holdingValue}>
                  ≈ ${coinData.userHolding.value.toLocaleString()}
                </Text>
              </View>
              <View style={styles.holdingRow}>
                <Text style={styles.holdingLabel}>Avg Buy Price</Text>
                <Text style={styles.holdingValue}>
                  ${coinData.userHolding.avgBuyPrice.toLocaleString()}
                </Text>
              </View>
              <View style={styles.holdingRow}>
                <Text style={styles.holdingLabel}>Profit/Loss</Text>
                <Text
                  style={[
                    styles.holdingValue,
                    {
                      color:
                        coinData.userHolding.profitLoss >= 0
                          ? Colors.success
                          : Colors.error,
                    },
                  ]}
                >
                  ${coinData.userHolding.profitLoss.toFixed(2)} (
                  {coinData.userHolding.profitLoss >= 0 ? "+" : ""}
                  {coinData.userHolding.profitLossPercent.toFixed(1)}%)
                </Text>
              </View>
              <Pressable
                onPress={handleAddMorePress}
                style={styles.addMoreButton}
              >
                <Text style={styles.addMoreButtonText}>Add More</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Market Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market Stats</Text>
          <View style={styles.card}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Market Cap</Text>
              <Text style={styles.statValue}>
                {formatLargeNumber(coinData.marketStats.marketCap)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>24h Volume</Text>
              <Text style={styles.statValue}>
                {formatLargeNumber(coinData.marketStats.volume24h)}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Circulating Supply</Text>
              <Text style={styles.statValue}>
                {coinData.marketStats.circulatingSupply.toLocaleString()}{" "}
                {coinData.symbol}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Max Supply</Text>
              <Text style={styles.statValue}>
                {coinData.marketStats.maxSupply > 0
                  ? `${coinData.marketStats.maxSupply.toLocaleString()} ${
                      coinData.symbol
                    }`
                  : "Unlimited"}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>All-Time High</Text>
              <Text style={styles.statValue}>
                ${coinData.marketStats.ath.toLocaleString()} (
                {coinData.marketStats.athDate})
              </Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About {coinData.name}</Text>
          <View style={styles.card}>
            <Text style={styles.aboutText}>{coinData.about}</Text>
          </View>
        </View>

        {/* Placeholder sections for future features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <View style={styles.card}>
            <Text style={styles.placeholderText}>Coming soon...</Text>
          </View>
        </View>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  coinName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  coinSymbol: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  priceSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  price: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  timeRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
  },
  timeRangeButtonActive: {
    backgroundColor: Colors.primary,
  },
  timeRangeText: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  timeRangeTextActive: {
    color: Colors.textPrimary,
  },
  chartContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  chart: {
    borderRadius: 16,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonSecondary: {
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  actionButtonTextSecondary: {
    color: Colors.textSecondary,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
  },
  holdingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  holdingLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  holdingValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  addMoreButton: {
    marginTop: 8,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  addMoreButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  placeholderText: {
    fontSize: 14,
    color: Colors.textTertiary,
    textAlign: "center",
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: "center",
    marginTop: 20,
  },
  bottomSpacer: {
    height: 24,
  },
});
