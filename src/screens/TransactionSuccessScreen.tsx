import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { HomeStackParamList } from "../types";

type TransactionSuccessRouteProp = RouteProp<HomeStackParamList, "TransactionSuccess">;

export default function TransactionSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute<TransactionSuccessRouteProp>();
  const { type, details } = route.params;

  const getSuccessMessage = () => {
    switch (type) {
      case "send":
        return {
          title: "Transaction Sent!",
          message: `Successfully sent ${details.amount} ${details.asset}`,
          icon: "checkmark-circle",
        };
      case "swap":
        return {
          title: "Swap Complete!",
          message: `Successfully swapped ${details.fromAmount} ${details.fromAsset} for ${details.toAmount} ${details.toAsset}`,
          icon: "checkmark-circle",
        };
      case "buy":
        return {
          title: "Purchase Complete!",
          message: `Successfully purchased ${details.amount} ${details.asset}`,
          icon: "checkmark-circle",
        };
      case "receive":
        return {
          title: "Received!",
          message: `Successfully received ${details.amount} ${details.asset}`,
          icon: "checkmark-circle",
        };
      default:
        return {
          title: "Success!",
          message: "Transaction completed successfully",
          icon: "checkmark-circle",
        };
    }
  };

  const successInfo = getSuccessMessage();

  const handleDone = () => {
    // Navigate back to home
    navigation.navigate("HomeMain");
  };

  const handleViewDetails = () => {
    // TODO: Navigate to transaction history or details
    console.log("View transaction details:", details);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name={successInfo.icon as any} size={80} color={Colors.success} />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>{successInfo.title}</Text>
        <Text style={styles.message}>{successInfo.message}</Text>

        {/* Transaction Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Transaction Details</Text>
          
          {type === "send" && (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.detailValue}>{details.amount} {details.asset}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>To</Text>
                <Text style={styles.detailValue} numberOfLines={1}>
                  {details.address?.substring(0, 20)}...
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Network Fee</Text>
                <Text style={styles.detailValue}>${details.fee}</Text>
              </View>
            </>
          )}

          {type === "swap" && (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>From</Text>
                <Text style={styles.detailValue}>{details.fromAmount} {details.fromAsset}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>To</Text>
                <Text style={styles.detailValue}>{details.toAmount} {details.toAsset}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Rate</Text>
                <Text style={styles.detailValue}>{details.rate}</Text>
              </View>
            </>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>
              {new Date(details.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        </View>

        {/* Info Message */}
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>
            Your transaction has been submitted to the blockchain and will be confirmed shortly.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <Pressable style={styles.secondaryButton} onPress={handleViewDetails}>
          <Text style={styles.secondaryButtonText}>View Details</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={handleDone}>
          <Text style={styles.primaryButtonText}>Done</Text>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 60,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.backgroundCard,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  detailsCard: {
    width: "100%",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    maxWidth: 200,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    width: "100%",
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
  secondaryButton: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
});
