import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { mockHomeData } from "../data/mockHomeData";

export default function ReceiveCryptoScreen() {
  const navigation = useNavigation();
  const [selectedAsset, setSelectedAsset] = useState(mockHomeData.holdings[0]);
  const [selectedNetwork, setSelectedNetwork] = useState<"main" | "lightning">(
    "main"
  );
  const [showAssetPicker, setShowAssetPicker] = useState(false);

  // Mock address - in production this would be generated
  const mockAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
  const truncatedAddress = `${mockAddress.substring(
    0,
    10
  )}...${mockAddress.substring(mockAddress.length - 8)}`;

  const handleCopyAddress = () => {
    // TODO: Implement clipboard copy
    Alert.alert("Copied!", "Address copied to clipboard");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `My ${selectedAsset.name} address: ${mockAddress}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
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
        <Text style={styles.headerTitle}>Receive Crypto</Text>
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

        {/* Select Network (for Bitcoin example) */}
        {selectedAsset.symbol === "BTC" && (
          <View style={styles.section}>
            <Text style={styles.label}>Select Network</Text>
            <View style={styles.networkToggle}>
              <Pressable
                style={[
                  styles.networkButton,
                  selectedNetwork === "main" && styles.networkButtonActive,
                ]}
                onPress={() => setSelectedNetwork("main")}
              >
                <Text
                  style={[
                    styles.networkButtonText,
                    selectedNetwork === "main" &&
                      styles.networkButtonTextActive,
                  ]}
                >
                  Bitcoin
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.networkButton,
                  selectedNetwork === "lightning" && styles.networkButtonActive,
                ]}
                onPress={() => setSelectedNetwork("lightning")}
              >
                <Text
                  style={[
                    styles.networkButtonText,
                    selectedNetwork === "lightning" &&
                      styles.networkButtonTextActive,
                  ]}
                >
                  Lightning
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <View style={styles.qrCodePlaceholder}>
            <Ionicons name="qr-code" size={160} color={Colors.textSecondary} />
          </View>
          <Text style={styles.qrLabel}>
            Scan to send {selectedAsset.symbol}
          </Text>
        </View>

        {/* Address */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{truncatedAddress}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton} onPress={handleCopyAddress}>
            <Ionicons
              name="copy-outline"
              size={20}
              color={Colors.textPrimary}
            />
            <Text style={styles.actionButtonText}>Copy Address</Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={handleShare}>
            <Ionicons
              name="share-outline"
              size={20}
              color={Colors.textPrimary}
            />
            <Text style={styles.actionButtonText}>Share</Text>
          </Pressable>
        </View>

        {/* Warning */}
        <View style={styles.warningContainer}>
          <Ionicons name="warning-outline" size={20} color={Colors.warning} />
          <Text style={styles.warningText}>
            Only send {selectedAsset.symbol} to this address. Sending any other
            asset may result in permanent loss.
          </Text>
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
  networkToggle: {
    flexDirection: "row",
    gap: 8,
  },
  networkButton: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  networkButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  networkButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  networkButtonTextActive: {
    color: Colors.textPrimary,
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  qrCodePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qrLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 12,
  },
  addressContainer: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  addressText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  warningContainer: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
