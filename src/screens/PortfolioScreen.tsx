import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors, ChartColors } from "../constants/colors";
import {
  mockPortfolioData,
  calculateAllocation,
} from "../data/mockPortfolioData";
import { mockHomeData } from "../data/mockHomeData";
import HoldingRow from "../components/HoldingRow";
import { Holding, HomeStackParamList } from "../types";

const screenWidth = Dimensions.get("window").width;

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";

export default function PortfolioScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>("1W");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleHoldingPress = (holding: Holding) => {
    navigation.navigate("CoinDetail", { coinId: holding.coinId });
  };

  const handleAddHolding = () => {
    console.log("Add holding pressed");
    // TODO: Navigate to PORT-002 (Add Holding)
  };

  // Calculate allocation data for pie chart
  const allocationData = calculateAllocation(mockHomeData.holdings);
  const pieData = allocationData.map((item, index) => ({
    name: item.symbol,
    population: item.value,
    color: getColorForIndex(index),
    legendFontColor: Colors.textSecondary,
    legendFontSize: 12,
  }));

  // Performance chart data
  const performanceData = mockPortfolioData.performanceData[selectedTimeRange];
  const performanceLabels =
    mockPortfolioData.performanceLabels[selectedTimeRange];

  const isPositiveChange = mockPortfolioData.change24h >= 0;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView
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
        {/* Portfolio Value Header */}
        <View style={styles.header}>
          <Text style={styles.label}>Total Portfolio Value</Text>
          <Text style={styles.value}>
            $
            {mockPortfolioData.totalValue.toLocaleString("en-US", {
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
              ${Math.abs(mockPortfolioData.change24h).toFixed(2)} (
              {isPositiveChange ? "+" : ""}
              {mockPortfolioData.changePercent24h.toFixed(2)}%)
            </Text>
          </View>
        </View>

        {/* Time Range Selector */}
        <View style={styles.timeRangeContainer}>
          {(["1D", "1W", "1M", "3M", "1Y", "ALL"] as TimeRange[]).map(
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

        {/* Performance Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: performanceLabels,
              datasets: [
                {
                  data: performanceData,
                },
              ],
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
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: Colors.primary,
              },
            }}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withOuterLines={true}
            withVerticalLines={false}
            withHorizontalLines={true}
          />
        </View>

        {/* Allocation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asset Allocation</Text>
          <View style={styles.pieChartContainer}>
            <PieChart
              data={pieData}
              width={screenWidth - 32}
              height={200}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>

        {/* Holdings Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Holdings</Text>
            <Pressable onPress={handleAddHolding} style={styles.addButton}>
              <Ionicons name="add-circle" size={24} color={Colors.primary} />
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>

          <View style={styles.holdingsList}>
            {mockHomeData.holdings.map((holding, index) => (
              <View key={holding.coinId}>
                <HoldingRow holding={holding} onPress={handleHoldingPress} />
                {index < mockHomeData.holdings.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to get colors for pie chart
function getColorForIndex(index: number): string {
  return ChartColors[index % ChartColors.length];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  value: {
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
    fontSize: 16,
    fontWeight: "600",
  },
  timeRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
  },
  timeRangeButtonActive: {
    backgroundColor: Colors.primary,
  },
  timeRangeText: {
    fontSize: 12,
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
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  pieChartContainer: {
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
  },
  holdingsList: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    overflow: "hidden",
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 60,
  },
  bottomSpacer: {
    height: 24,
  },
});
