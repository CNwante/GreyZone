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

export default function SendCryptoScreen() {
  const navigation = useNavigation();
  const [selectedAsset, setSelectedAsset] = useState(mockHomeData.holdings[0]);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [currencyMode, setCurrencyMode] = useState<"crypto" | "usd">("crypto");

  const networkFee = 2.5;
  const estimatedTime = "≈10 min";

  const handlePaste = async () => {
    // TODO: Implement clipboard paste
    Alert.alert("Paste", "Clipboard paste functionality");
  };

  const handleQRScan = () => {
    // TODO: Implement QR scanner
    Alert.alert("QR Scan", "Camera QR scanning functionality");
  };

  const handlePercentage = (percent: number) => {
    const maxAmount = selectedAsset.amount;
    const calculatedAmount = (maxAmount * percent) / 100;
    setAmount(calculatedAmount.toFixed(8));
  };

  const toggleCurrencyMode = () => {
    setCurrencyMode((prev) => (prev === "crypto" ? "usd" : "crypto"));
  };

  const handlePreviewSend = () => {
    if (!recipientAddress.trim()) {
      Alert.alert("Error", "Please enter a recipient address");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    if (parseFloat(amount) > selectedAsset.amount) {
      Alert.alert("Error", "Insufficient balance");
      return;
    }

    // TODO: Navigate to confirmation screen
    Alert.alert(
      "Preview Send",
      `Send ${amount} ${selectedAsset.symbol} to ${recipientAddress.substring(
        0,
        10
      )}...`
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
        <Text style={styles.headerTitle}>Send Crypto</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Select Asset */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Asset</Text>
          <Pressable
            style={styles.assetSelector}
            onPress={() => setShowAssetPicker(!showAssetPicker)}
          >
            <View style={styles.assetInfo}>
              <Text style={styles.assetIcon}>{selectedAsset.logo}</Text>
              <View>
                <Text style={styles.assetName}>{selectedAsset.name}</Text>
                <Text style={styles.assetBalance}>
                  {selectedAsset.amount.toFixed(8)} {selectedAsset.symbol}
                </Text>
              </View>
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

        {/* Recipient Address */}
        <View style={styles.section}>
          <Text style={styles.label}>Recipient Address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter or paste address"
              placeholderTextColor={Colors.textSecondary}
              value={recipientAddress}
              onChangeText={setRecipientAddress}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable onPress={handlePaste} style={styles.inputButton}>
              <Ionicons
                name="clipboard-outline"
                size={20}
                color={Colors.primary}
              />
            </Pressable>
            <Pressable onPress={handleQRScan} style={styles.inputButton}>
              <Ionicons
                name="qr-code-outline"
                size={20}
                color={Colors.primary}
              />
            </Pressable>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.section}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0.0"
              placeholderTextColor={Colors.textSecondary}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
            <Pressable
              onPress={toggleCurrencyMode}
              style={styles.currencyToggle}
            >
              <Text style={styles.currencyText}>
                {currencyMode === "crypto" ? selectedAsset.symbol : "USD"}
              </Text>
              <Ionicons
                name="swap-horizontal"
                size={16}
                color={Colors.primary}
              />
            </Pressable>
          </View>

          {/* Percentage Buttons */}
          <View style={styles.percentageRow}>
            {[25, 50, 75, 100].map((percent) => (
              <Pressable
                key={percent}
                style={styles.percentageButton}
                onPress={() => handlePercentage(percent)}
              >
                <Text style={styles.percentageText}>
                  {percent === 100 ? "MAX" : `${percent}%`}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Network Fee */}
        <View style={styles.feeContainer}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Network Fee:</Text>
            <Text style={styles.feeValue}>~${networkFee.toFixed(2)}</Text>
          </View>
          <Text style={styles.feeTime}>{estimatedTime}</Text>
        </View>

        {/* Preview Button */}
        <Pressable style={styles.previewButton} onPress={handlePreviewSend}>
          <Text style={styles.previewButtonText}>Preview Send</Text>
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
  assetBalance: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    paddingVertical: 16,
  },
  inputButton: {
    padding: 8,
    marginLeft: 8,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textPrimary,
    paddingVertical: 16,
  },
  currencyToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 12,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  percentageRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  percentageButton: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  feeContainer: {
    marginTop: 24,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  feeLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  feeValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  feeTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
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
