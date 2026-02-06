import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { mockUserSettings } from "../data/mockUserData";

export default function NotificationSettingsScreen() {
  const navigation = useNavigation();

  // Local state for notification settings
  const [priceAlerts, setPriceAlerts] = useState(
    mockUserSettings.notifications.priceAlerts
  );
  const [aiPredictions, setAiPredictions] = useState(
    mockUserSettings.notifications.aiPredictions
  );
  const [rugPullWarnings, setRugPullWarnings] = useState(
    mockUserSettings.notifications.rugPullWarnings
  );
  const [portfolioUpdates, setPortfolioUpdates] = useState(
    mockUserSettings.notifications.portfolioUpdates
  );
  const [newsAndUpdates, setNewsAndUpdates] = useState(
    mockUserSettings.notifications.newsAndUpdates
  );
  const [pushEnabled, setPushEnabled] = useState(
    mockUserSettings.notifications.pushEnabled
  );
  const [emailEnabled, setEmailEnabled] = useState(
    mockUserSettings.notifications.emailEnabled
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notification Channels Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICATION CHANNELS</Text>

          {/* Push Notifications */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.primary + "20" },
                ]}
              >
                <Ionicons
                  name="notifications"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive alerts on your device
                </Text>
              </View>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary + "80" }}
              thumbColor={pushEnabled ? Colors.primary : Colors.textTertiary}
            />
          </View>

          {/* Email Notifications */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.primary + "20" },
                ]}
              >
                <Ionicons name="mail" size={20} color={Colors.primary} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Email Notifications</Text>
                <Text style={styles.settingDescription}>
                  Receive updates via email
                </Text>
              </View>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary + "80" }}
              thumbColor={emailEnabled ? Colors.primary : Colors.textTertiary}
            />
          </View>
        </View>

        {/* Alert Types Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ALERT TYPES</Text>
          <Text style={styles.sectionDescription}>
            Choose what types of notifications you want to receive
          </Text>

          {/* Price Alerts */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.warning + "20" },
                ]}
              >
                <Ionicons name="trending-up" size={20} color={Colors.warning} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Price Alerts</Text>
                <Text style={styles.settingDescription}>
                  When your custom price targets are reached
                </Text>
              </View>
            </View>
            <Switch
              value={priceAlerts}
              onValueChange={setPriceAlerts}
              trackColor={{ false: Colors.border, true: Colors.warning + "80" }}
              thumbColor={priceAlerts ? Colors.warning : Colors.textTertiary}
            />
          </View>

          {/* AI Predictions */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.primary + "20" },
                ]}
              >
                <Ionicons name="sparkles" size={20} color={Colors.primary} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>AI Predictions</Text>
                <Text style={styles.settingDescription}>
                  New AI insights for your holdings
                </Text>
              </View>
            </View>
            <Switch
              value={aiPredictions}
              onValueChange={setAiPredictions}
              trackColor={{ false: Colors.border, true: Colors.primary + "80" }}
              thumbColor={aiPredictions ? Colors.primary : Colors.textTertiary}
            />
          </View>

          {/* Rug Pull Warnings */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.error + "20" },
                ]}
              >
                <Ionicons name="warning" size={20} color={Colors.error} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Rug Pull Warnings</Text>
                <Text style={styles.settingDescription}>
                  Critical security alerts (Recommended)
                </Text>
              </View>
            </View>
            <Switch
              value={rugPullWarnings}
              onValueChange={setRugPullWarnings}
              trackColor={{ false: Colors.border, true: Colors.error + "80" }}
              thumbColor={rugPullWarnings ? Colors.error : Colors.textTertiary}
            />
          </View>

          {/* Portfolio Updates */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.success + "20" },
                ]}
              >
                <Ionicons name="pie-chart" size={20} color={Colors.success} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Portfolio Updates</Text>
                <Text style={styles.settingDescription}>
                  Daily summaries and major changes
                </Text>
              </View>
            </View>
            <Switch
              value={portfolioUpdates}
              onValueChange={setPortfolioUpdates}
              trackColor={{ false: Colors.border, true: Colors.success + "80" }}
              thumbColor={
                portfolioUpdates ? Colors.success : Colors.textTertiary
              }
            />
          </View>

          {/* News & Updates */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.textSecondary + "20" },
                ]}
              >
                <Ionicons
                  name="newspaper"
                  size={20}
                  color={Colors.textSecondary}
                />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>News & Updates</Text>
                <Text style={styles.settingDescription}>
                  Market news and app updates
                </Text>
              </View>
            </View>
            <Switch
              value={newsAndUpdates}
              onValueChange={setNewsAndUpdates}
              trackColor={{
                false: Colors.border,
                true: Colors.textSecondary + "80",
              }}
              thumbColor={
                newsAndUpdates ? Colors.textSecondary : Colors.textTertiary
              }
            />
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={24}
            color={Colors.primary}
          />
          <Text style={styles.infoText}>
            You can always adjust these settings later. We recommend keeping Rug
            Pull Warnings enabled for your security.
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
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
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textTertiary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sectionDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: Colors.primary + "10",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.primary + "30",
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 32,
  },
});
