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

type TransactionErrorRouteProp = RouteProp<HomeStackParamList, "TransactionError">;

export default function TransactionErrorScreen() {
  const navigation = useNavigation();
  const route = useRoute<TransactionErrorRouteProp>();
  const { type, error } = route.params;

  const getErrorMessage = () => {
    switch (type) {
      case "send":
        return {
          title: "Send Failed",
          message: "Unable to complete your transaction",
        };
      case "swap":
        return {
          title: "Swap Failed",
          message: "Unable to complete the swap",
        };
      case "buy":
        return {
          title: "Purchase Failed",
          message: "Unable to complete your purchase",
        };
      default:
        return {
          title: "Transaction Failed",
          message: "Something went wrong",
        };
    }
  };

  const errorInfo = getErrorMessage();

  const handleTryAgain = () => {
    navigation.goBack();
  };

  const handleGoHome = () => {
    navigation.navigate("HomeMain");
  };

  const handleGetSupport = () => {
    // TODO: Navigate to support screen
    console.log("Contact support");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Error Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="close-circle" size={80} color={Colors.error} />
          </View>
        </View>

        {/* Error Message */}
        <Text style={styles.title}>{errorInfo.title}</Text>
        <Text style={styles.message}>{errorInfo.message}</Text>

        {/* Error Details Card */}
        <View style={styles.errorCard}>
          <View style={styles.errorHeader}>
            <Ionicons name="warning-outline" size={24} color={Colors.error} />
            <Text style={styles.errorTitle}>Error Details</Text>
          </View>
          
          <Text style={styles.errorText}>{error}</Text>
        </View>

        {/* Common Solutions */}
        <View style={styles.solutionsCard}>
          <Text style={styles.solutionsTitle}>Common Solutions</Text>
          
          <View style={styles.solutionItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.solutionText}>Check your internet connection</Text>
          </View>

          <View style={styles.solutionItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.solutionText}>Ensure sufficient balance for fees</Text>
          </View>

          <View style={styles.solutionItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.solutionText}>Verify all transaction details</Text>
          </View>

          <View style={styles.solutionItem}>
            <Ionicons name="checkmark-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.solutionText}>Try again in a few moments</Text>
          </View>
        </View>

        {/* Support Link */}
        <Pressable style={styles.supportButton} onPress={handleGetSupport}>
          <Ionicons name="help-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.supportText}>Contact Support</Text>
        </Pressable>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <Pressable style={styles.secondaryButton} onPress={handleGoHome}>
          <Text style={styles.secondaryButtonText}>Go Home</Text>
        </Pressable>

        <Pressable style={styles.primaryButton} onPress={handleTryAgain}>
          <Text style={styles.primaryButtonText}>Try Again</Text>
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
  errorCard: {
    width: "100%",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.error,
    marginBottom: 24,
  },
  errorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  errorText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  solutionsCard: {
    width: "100%",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 24,
  },
  solutionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  solutionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  solutionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  supportText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
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
