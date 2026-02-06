import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { mockHomeData } from "../data/mockHomeData";
import { HomeStackParamList } from "../types";

type SwapScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "SwapCrypto"
>;

export default function SwapScreen() {
  const navigation = useNavigation<SwapScreenNavigationProp>();
  const [fromAsset, setFromAsset] = useState(mockHomeData.holdings[0]);
  const [toAsset, setToAsset] = useState(mockHomeData.holdings[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [slippage, setSlippage] = useState(0.5);

  // Mock exchange rate
  const exchangeRate = 15.23;
  const estimatedFee = 5.0;

  const handleSwapDirection = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = parseFloat(value) * exchangeRate;
      setToAmount(calculated.toFixed(8));
    } else {
      setToAmount("");
    }
  };

  const handleSlippagePress = () => {
    Alert.alert("Slippage Tolerance", "Select maximum price slippage", [
      { text: "0.1%", onPress: () => setSlippage(0.1) },
      { text: "0.5%", onPress: () => setSlippage(0.5) },
      { text: "1.0%", onPress: () => setSlippage(1.0) },
      {
        text: "Custom",
        onPress: () => Alert.alert("Custom", "Custom slippage input"),
      },
    ]);
  };

  const handlePreviewSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      Alert.alert("Error", "Please enter an amount to swap");
      return;
    }
    if (parseFloat(fromAmount) > fromAsset.amount) {
      Alert.alert("Error", "Insufficient balance");
      return;
    }

    // Navigate to confirmation screen
    navigation.navigate("SwapConfirmation", {
      fromAsset: fromAsset.symbol,
      toAsset: toAsset.symbol,
      fromAmount: fromAmount,
      toAmount: toAmount,
      rate: `1 ${fromAsset.symbol} = ${exchangeRate} ${toAsset.symbol}`,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Swap</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* From Section */}
        <View style={styles.section}>
          <Text style={styles.label}>From</Text>
          <View style={styles.swapCard}>
            <View style={styles.swapCardTop}>
              <Pressable
                style={styles.assetSelector}
                onPress={() => setShowFromPicker(!showFromPicker)}
              >
                <Text style={styles.assetIcon}>{fromAsset.logo}</Text>
                <Text style={styles.assetSymbol}>{fromAsset.symbol}</Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={Colors.textSecondary}
                />
              </Pressable>
              <TextInput
                style={styles.amountInput}
                placeholder="0.0"
                placeholderTextColor={Colors.textSecondary}
                value={fromAmount}
                onChangeText={handleFromAmountChange}
                keyboardType="decimal-pad"
              />
            </View>
            <Text style={styles.swapCardBalance}>
              Balance: {fromAsset.amount.toFixed(8)} {fromAsset.symbol}
            </Text>
          </View>

          {/* From Asset Picker */}
          {showFromPicker && (
            <View style={styles.assetPicker}>
              {mockHomeData.holdings.map((asset) => (
                <Pressable
                  key={asset.coinId}
                  style={styles.assetPickerItem}
                  onPress={() => {
                    setFromAsset(asset);
                    setShowFromPicker(false);
                  }}
                >
                  <Text style={styles.assetIcon}>{asset.logo}</Text>
                  <View style={styles.assetPickerInfo}>
                    <Text style={styles.assetName}>{asset.name}</Text>
                    <Text style={styles.assetBalance}>
                      {asset.amount.toFixed(8)} {asset.symbol}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Swap Direction Button */}
        <View style={styles.swapButtonContainer}>
          <Pressable style={styles.swapButton} onPress={handleSwapDirection}>
            <Ionicons name="swap-vertical" size={24} color={Colors.primary} />
          </Pressable>
        </View>

        {/* To Section */}
        <View style={styles.section}>
          <Text style={styles.label}>To</Text>
          <View style={styles.swapCard}>
            <View style={styles.swapCardTop}>
              <Pressable
                style={styles.assetSelector}
                onPress={() => setShowToPicker(!showToPicker)}
              >
                <Text style={styles.assetIcon}>{toAsset.logo}</Text>
                <Text style={styles.assetSymbol}>{toAsset.symbol}</Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={Colors.textSecondary}
                />
              </Pressable>
              <TextInput
                style={styles.amountInput}
                placeholder="0.0"
                placeholderTextColor={Colors.textSecondary}
                value={toAmount}
                editable={false}
                keyboardType="decimal-pad"
              />
            </View>
            <Text style={styles.swapCardBalance}>
              ≈ $
              {(
                (parseFloat(toAmount || "0") * toAsset.value) /
                toAsset.amount
              ).toFixed(2)}
            </Text>
          </View>

          {/* To Asset Picker */}
          {showToPicker && (
            <View style={styles.assetPicker}>
              {mockHomeData.holdings.map((asset) => (
                <Pressable
                  key={asset.coinId}
                  style={styles.assetPickerItem}
                  onPress={() => {
                    setToAsset(asset);
                    setShowToPicker(false);
                  }}
                >
                  <Text style={styles.assetIcon}>{asset.logo}</Text>
                  <View style={styles.assetPickerInfo}>
                    <Text style={styles.assetName}>{asset.name}</Text>
                    <Text style={styles.assetBalance}>
                      {asset.amount.toFixed(8)} {asset.symbol}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Swap Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rate:</Text>
            <Text style={styles.detailValue}>
              1 {fromAsset.symbol} = {exchangeRate} {toAsset.symbol}
            </Text>
          </View>
          <Pressable style={styles.detailRow} onPress={handleSlippagePress}>
            <Text style={styles.detailLabel}>Slippage:</Text>
            <View style={styles.detailValueRow}>
              <Text style={styles.detailValue}>{slippage}%</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.textSecondary}
              />
            </View>
          </Pressable>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Est. Fee:</Text>
            <Text style={styles.detailValue}>${estimatedFee.toFixed(2)}</Text>
          </View>
        </View>

        {/* Preview Button */}
        <Pressable style={styles.previewButton} onPress={handlePreviewSwap}>
          <Text style={styles.previewButtonText}>Preview Swap</Text>
        </Pressable>
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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  swapCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  swapCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assetSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  assetIcon: {
    fontSize: 24,
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  amountInput: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textPrimary,
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  swapCardBalance: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  swapButtonContainer: {
    alignItems: "center",
    marginVertical: -12,
    zIndex: 10,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.backgroundCard,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  assetPicker: {
    marginTop: 8,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },
  assetPickerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  assetPickerInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  assetBalance: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  detailsContainer: {
    marginTop: 24,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  detailValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  previewButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  previewButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
