import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { HomeStackParamList } from "../types";

type SwapConfirmationRouteProp = RouteProp<HomeStackParamList, "SwapConfirmation">;

export default function SwapConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute<SwapConfirmationRouteProp>();
  const { fromAsset, toAsset, fromAmount, toAmount, rate } = route.params;
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmSwap = async () => {
    setIsProcessing(true);

    // Simulate swap processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Navigate to success screen
      navigation.navigate("TransactionSuccess", {
        type: "swap",
        details: {
          fromAsset,
          toAsset,
          fromAmount,
          toAmount,
          rate,
          timestamp: new Date().toISOString(),
        },
      });
    }, 2000);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleCancel} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Confirm Swap</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Swap Display */}
        <View style={styles.swapContainer}>
          <View style={styles.assetContainer}>
            <Text style={styles.assetLabel}>From</Text>
            <Text style={styles.assetAmount}>{fromAmount}</Text>
            <Text style={styles.assetSymbol}>{fromAsset}</Text>
          </View>

          <View style={styles.swapIconContainer}>
            <Ionicons name="swap-vertical" size={32} color={Colors.primary} />
          </View>

          <View style={styles.assetContainer}>
            <Text style={styles.assetLabel}>To</Text>
            <Text style={styles.assetAmount}>{toAmount}</Text>
            <Text style={styles.assetSymbol}>{toAsset}</Text>
          </View>
        </View>

        {/* Transaction Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Exchange Rate</Text>
            <Text style={styles.detailValue}>{rate}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Slippage Tolerance</Text>
            <Text style={styles.detailValue}>0.5%</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Fee</Text>
            <Text style={styles.detailValue}>$5.00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Minimum Received</Text>
            <Text style={styles.detailValue}>
              {(parseFloat(toAmount) * 0.995).toFixed(8)} {toAsset}
            </Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.infoText}>
            The final amount may vary slightly due to market conditions and slippage.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={[styles.cancelButton, isProcessing && styles.buttonDisabled]}
          onPress={handleCancel}
          disabled={isProcessing}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[styles.confirmButton, isProcessing && styles.buttonDisabled]}
          onPress={handleConfirmSwap}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color={Colors.textPrimary} />
          ) : (
            <Text style={styles.confirmButtonText}>Confirm Swap</Text>
          )}
        </Pressable>
      </View>
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
  swapContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  assetContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  assetLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  assetAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  swapIconContainer: {
    marginVertical: 16,
  },
  detailsContainer: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
  divider: {
    height: 1,
    backgroundColor: Colors.border,
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
  bottomContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
