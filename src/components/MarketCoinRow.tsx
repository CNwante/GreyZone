import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../constants/colors";
import { MarketCoin } from "../data/mockMarketData";
import { HomeStackParamList } from "../types";

interface MarketCoinRowProps {
  coin: MarketCoin;
  showRank?: boolean;
}

export default function MarketCoinRow({
  coin,
  showRank = true,
}: MarketCoinRowProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handlePress = () => {
    navigation.navigate("CoinDetail", { coinId: coin.id });
  };

  const isPositive = coin.changePercent24h >= 0;
  const changeColor = isPositive ? Colors.success : Colors.error;

  // Format price based on value
  const formatPrice = (price: number): string => {
    if (price < 0.01) {
      return `$${price.toFixed(8)}`;
    } else if (price < 1) {
      return `$${price.toFixed(4)}`;
    } else if (price < 100) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  // Format market cap
  const formatMarketCap = (value: number): string => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {showRank && <Text style={styles.rank}>{coin.rank}</Text>}

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>{coin.logo}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {coin.name}
          </Text>
          {coin.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
        </View>
        <Text style={styles.symbol}>{coin.symbol}</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>{formatPrice(coin.price)}</Text>
        <Text style={styles.marketCap}>{formatMarketCap(coin.marketCap)}</Text>
      </View>

      <View style={styles.changeContainer}>
        <View
          style={[styles.changeBox, { backgroundColor: changeColor + "20" }]}
        >
          <Ionicons
            name={isPositive ? "trending-up" : "trending-down"}
            size={12}
            color={changeColor}
          />
          <Text style={[styles.changeText, { color: changeColor }]}>
            {isPositive ? "+" : ""}
            {coin.changePercent24h.toFixed(2)}%
          </Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={Colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: Colors.border,
  },
  rank: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
    width: 32,
    marginRight: 8,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logo: {
    fontSize: 20,
    color: Colors.primary,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  newBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  symbol: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceContainer: {
    alignItems: "flex-end",
    marginRight: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  marketCap: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  changeContainer: {
    marginRight: 8,
  },
  changeBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
