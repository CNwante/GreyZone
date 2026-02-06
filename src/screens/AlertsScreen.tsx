import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Colors } from "../constants/colors";
import AlertRow from "../components/AlertRow";
import RugPullWarningRow from "../components/RugPullWarningRow";
import {
  mockAlerts,
  mockRugPullWarnings,
  Alert,
  RugPullWarning,
  filterAlertsByStatus,
} from "../data/mockAlertsData";

type FilterTab = "active" | "triggered" | "all";

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [warnings, setWarnings] =
    useState<RugPullWarning[]>(mockRugPullWarnings);
  const [selectedTab, setSelectedTab] = useState<FilterTab>("active");
  const [refreshing, setRefreshing] = useState(false);

  // Filter alerts based on selected tab
  const filteredAlerts = filterAlertsByStatus(alerts, selectedTab);

  // Count alerts by status
  const activeCount = alerts.filter((a) => a.status === "active").length;
  const triggeredCount = alerts.filter((a) => a.status === "triggered").length;

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleCreateAlert = () => {
    console.log("Create new alert - Navigate to ALERT-002");
    // TODO: Navigate to ALERT-002 (Create Alert screen)
  };

  const handleAlertPress = (alert: Alert) => {
    console.log("Alert pressed:", alert.id);
    // TODO: Navigate to ALERT-004 (Edit Alert) or ALERT-005 (Alert Triggered)
  };

  const handleWarningPress = (warning: RugPullWarning) => {
    console.log("Warning pressed:", warning.id);
    // TODO: Navigate to ALERT-003 (Rug Pull Warning Detail)
  };

  const handleDeleteAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const handleDeleteWarning = (warningId: string) => {
    setWarnings((prev) => prev.filter((w) => w.id !== warningId));
  };

  const renderRightActions = (id: string, type: "alert" | "warning") => {
    return (
      <Pressable
        style={styles.deleteButton}
        onPress={() =>
          type === "alert" ? handleDeleteAlert(id) : handleDeleteWarning(id)
        }
      >
        <Ionicons name="trash-outline" size={24} color={Colors.textPrimary} />
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    );
  };

  const hasAlerts = filteredAlerts.length > 0;
  const hasWarnings = warnings.length > 0;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
        <Pressable
          onPress={handleCreateAlert}
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
        >
          <Ionicons name="add" size={28} color={Colors.primary} />
        </Pressable>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        <Pressable
          onPress={() => setSelectedTab("active")}
          style={[styles.tab, selectedTab === "active" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "active" && styles.activeTabText,
            ]}
          >
            Active {activeCount > 0 && `(${activeCount})`}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedTab("triggered")}
          style={[styles.tab, selectedTab === "triggered" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "triggered" && styles.activeTabText,
            ]}
          >
            Triggered {triggeredCount > 0 && `(${triggeredCount})`}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedTab("all")}
          style={[styles.tab, selectedTab === "all" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "all" && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Alerts Section */}
        {hasAlerts && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {selectedTab === "active"
                ? "Active Alerts"
                : selectedTab === "triggered"
                ? "Triggered Alerts"
                : "All Alerts"}
            </Text>
            <View style={styles.card}>
              {filteredAlerts.map((alert, index) => (
                <Swipeable
                  key={alert.id}
                  renderRightActions={() =>
                    renderRightActions(alert.id, "alert")
                  }
                  overshootRight={false}
                >
                  <AlertRow alert={alert} onPress={handleAlertPress} />
                </Swipeable>
              ))}
            </View>
          </View>
        )}

        {/* Empty State for Alerts */}
        {!hasAlerts && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔔</Text>
            <Text style={styles.emptyTitle}>
              No {selectedTab === "all" ? "" : selectedTab} alerts
            </Text>
            <Text style={styles.emptyDescription}>
              {selectedTab === "active"
                ? "Create your first price alert to get notified"
                : selectedTab === "triggered"
                ? "Your triggered alerts will appear here"
                : "Create an alert to monitor price changes"}
            </Text>
            <Pressable onPress={handleCreateAlert} style={styles.emptyButton}>
              <Text style={styles.emptyButtonText}>Create Alert</Text>
            </Pressable>
          </View>
        )}

        {/* Rug Pull Warnings Section */}
        {hasWarnings && (
          <View style={styles.section}>
            <View style={styles.warningSectionHeader}>
              <Ionicons name="warning" size={20} color={Colors.error} />
              <Text style={[styles.sectionTitle, styles.warningTitle]}>
                Rug Pull Warnings
              </Text>
            </View>
            <View style={styles.card}>
              {warnings.map((warning) => (
                <Swipeable
                  key={warning.id}
                  renderRightActions={() =>
                    renderRightActions(warning.id, "warning")
                  }
                  overshootRight={false}
                >
                  <RugPullWarningRow
                    warning={warning}
                    onPress={handleWarningPress}
                  />
                </Swipeable>
              ))}
            </View>
          </View>
        )}

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle"
            size={20}
            color={Colors.primary}
          />
          <Text style={styles.infoText}>
            Tap the + button to create a price alert. Swipe left on any alert to
            delete.
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonPressed: {
    opacity: 0.6,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.backgroundCard,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.textPrimary,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  warningSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  warningTitle: {
    marginHorizontal: 0,
    marginBottom: 0,
    color: Colors.error,
  },
  card: {
    backgroundColor: Colors.backgroundCard,
    overflow: "hidden",
  },
  deleteButton: {
    backgroundColor: Colors.error,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    paddingHorizontal: 12,
  },
  deleteText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: Colors.primary + "20",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary + "40",
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
