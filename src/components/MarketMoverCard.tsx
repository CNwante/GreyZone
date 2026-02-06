import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MarketMover, HomeStackParamList } from "../types";
import { Colors } from "../constants/colors";

interface MarketMoverCardProps {
  mover: MarketMover;
  onPress?: (mover: MarketMover) => void;
}

export default function MarketMoverCard({
  mover,
  onPress,
}: MarketMoverCardProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const isPositive = mover.changePercent24h >= 0;
  const changeColor = isPositive ? Colors.success : Colors.error;
  const changePrefix = isPositive ? "+" : "";

  const handlePress = () => {
    if (onPress) {
      onPress(mover);
    } else {
      // Default navigation to CoinDetail
      navigation.navigate("CoinDetail", { coinId: mover.coinId });
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>{mover.logo}</Text>
      </View>

      {/* Symbol */}
      <Text style={styles.symbol}>{mover.symbol}</Text>

      {/* Price */}
      <Text style={styles.price}>
        $
        {mover.price >= 1
          ? mover.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : mover.price.toFixed(4)}
      </Text>

      {/* Change Percentage */}
      <View
        style={[
          styles.changeContainer,
          { backgroundColor: changeColor + "20" },
        ]}
      >
        <Text style={[styles.change, { color: changeColor }]}>
          {changePrefix}
          {Math.abs(mover.changePercent24h).toFixed(2)}%
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    gap: 8,
  },
  containerPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  // Logo
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  logo: {
    fontSize: 28,
    color: Colors.textPrimary,
  },

  // Symbol
  symbol: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },

  // Price
  price: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textSecondary,
  },

  // Change
  changeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: "600",
  },
});
