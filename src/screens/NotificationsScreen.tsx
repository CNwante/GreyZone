import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SectionList,
  SectionListData,
  SectionListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Notification } from "../types";
import { Colors } from "../constants/colors";
import NotificationRow from "../components/NotificationRow";
import NotificationSectionHeader from "../components/NotificationSectionHeader";
import EmptyNotifications from "../components/EmptyNotifications";
import {
  mockNotifications,
  groupNotificationsByTime,
} from "../data/mockNotifications";

interface NotificationSection {
  title: string;
  data: Notification[];
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  // Group notifications by time
  const groupedNotifications = groupNotificationsByTime(notifications);

  // Format for SectionList
  const sections: NotificationSection[] = [
    { title: "Today", data: groupedNotifications.today },
    { title: "Yesterday", data: groupedNotifications.yesterday },
    { title: "Earlier", data: groupedNotifications.earlier },
  ].filter((section) => section.data.length > 0); // Only show sections with data

  const handleNotificationPress = (notification: Notification) => {
    console.log("Notification pressed:", notification.id);

    // Mark as read
    if (!notification.isRead) {
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }

    // TODO: Navigate to relevant screen based on notification type
    // For example:
    // - ai_insight -> AI Insights screen
    // - price_alert -> Coin Detail screen
    // - transaction -> Transaction Detail screen
    // - news -> News Detail screen
  };

  const renderSectionHeader = ({
    section,
  }: {
    section: SectionListData<Notification, NotificationSection>;
  }) => <NotificationSectionHeader title={section.title} />;

  const renderItem: SectionListRenderItem<
    Notification,
    NotificationSection
  > = ({ item }) => (
    <NotificationRow notification={item} onPress={handleNotificationPress} />
  );

  const renderSeparator = () => <View style={styles.separator} />;

  // Show empty state if no notifications
  if (notifications.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <EmptyNotifications />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 76,
  },
});
