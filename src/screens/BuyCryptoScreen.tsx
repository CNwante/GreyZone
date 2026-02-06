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
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { mockHomeData } from "../data/mockHomeData";

export default function BuyCryptoScreen() {
  const navigation = useNavigation();
  const [selectedAsset, setSelectedAsset] = useState(mockHomeData.holdings[0]);
  const [amount, setAmount] = useState("");
  const [showAssetPicker, setShowAssetPicker] = useState(false);

  // Mock values
  const provider = "MoonPay";
  const feePercentage = 2.99;
  const feeAmount = amount
    ? ((parseFloat(amount) * feePercentage) / 100).toFixed(2)
    : "0.00";
  const cryptoAmount = amount
    ? (parseFloat(amount) / 45234.56).toFixed(8)
    : "0";

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter an amount to buy");
      return;
    }

    Alert.alert(
      "Continue to Provider",
      `You will be redirected to ${provider} to complete your purchase of $${amount} worth of ${selectedAsset.symbol}.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Continue",
          onPress: () => console.log("Opening provider webview"),
        },
      ]
    );
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
        <Text style={styles.headerTitle}>Buy Crypto</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Select Crypto */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Crypto</Text>
          <Pressable
            style={styles.assetSelector}
            onPress={() => setShowAssetPicker(!showAssetPicker)}
          >
            <View style={styles.assetInfo}>
              <Text style={styles.assetIcon}>{selectedAsset.logo}</Text>
              <Text style={styles.assetName}>{selectedAsset.name}</Text>
            </View>
            <Ionicons
              name="chevron-down"
              size={20}
              color={Colors.textSecondary}
            />
          </Pressable>

          {/* Asset Picker Dropdown */}
          {showAssetPicker && (
            <View style={styles.assetPicker}>
              {mockHomeData.holdings.map((asset) => (
                <Pressable
                  key={asset.coinId}
                  style={styles.assetPickerItem}
                  onPress={() => {
                    setSelectedAsset(asset);
                    setShowAssetPicker(false);
                  }}
                >
                  <Text style={styles.assetIcon}>{asset.logo}</Text>
                  <Text style={styles.assetName}>{asset.name}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* You Pay */}
        <View style={styles.section}>
          <Text style={styles.label}>You Pay</Text>
          <View style={styles.amountContainer}>
            <View style={styles.currencyLabel}>
              <Text style={styles.currencySymbol}>$</Text>
              <Text style={styles.currencyText}>USD</Text>
            </View>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              placeholderTextColor={Colors.textSecondary}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmounts}>
            {[50, 100, 250, 500].map((value) => (
              <Pressable
                key={value}
                style={styles.quickAmountButton}
                onPress={() => handleQuickAmount(value)}
              >
                <Text style={styles.quickAmountText}>${value}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* You Receive */}
        <View style={styles.receiveContainer}>
          <Text style={styles.receiveLabel}>You Receive</Text>
          <Text style={styles.receiveAmount}>
            ≈ {cryptoAmount} {selectedAsset.symbol}
          </Text>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.label}>Payment Method</Text>
          <Pressable style={styles.paymentMethod}>
            <View style={styles.paymentInfo}>
              <Ionicons name="card" size={24} color={Colors.primary} />
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentName}>Visa</Text>
                <Text style={styles.paymentNumber}>•••• 4242</Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textSecondary}
            />
          </Pressable>
        </View>

        {/* Provider Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Provider:</Text>
            <Text style={styles.detailValue}>{provider}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Fee:</Text>
            <Text style={styles.detailValue}>
              ${feeAmount} ({feePercentage}%)
            </Text>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoContainer}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.infoText}>
            You will be redirected to {provider} to complete your purchase
            securely.
          </Text>
        </View>

        {/* Continue Button */}
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue to {provider}</Text>
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
  assetSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  assetInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  assetIcon: {
    fontSize: 32,
  },
  assetName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
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
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  currencyLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 16,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  quickAmounts: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  quickAmountButton: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  receiveContainer: {
    marginTop: 24,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  receiveLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  receiveAmount: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  paymentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentDetails: {
    gap: 4,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  paymentNumber: {
    fontSize: 14,
    color: Colors.textSecondary,
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
  infoContainer: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
