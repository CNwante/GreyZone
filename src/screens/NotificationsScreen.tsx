import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  Pressable,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
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
  ].filter((section) => section.data.length > 0);

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
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== notificationId)
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) => ({ ...n, isRead: true }))
    );
  };

  const renderRightActions = (notificationId: string) => {
    return (
      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(notificationId)}
      >
        <Ionicons name="trash-outline" size={24} color={Colors.textPrimary} />
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    );
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
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      overshootRight={false}
    >
      <NotificationRow notification={item} onPress={handleNotificationPress} />
    </Swipeable>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  const hasUnreadNotifications = notifications.some((n) => !n.isRead);

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
      {/* Custom Header with Mark All Read button */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        {hasUnreadNotifications && (
          <Pressable
            onPress={handleMarkAllRead}
            style={({ pressed }) => [
              styles.markAllButton,
              pressed && styles.markAllButtonPressed,
            ]}
          >
            <Text style={styles.markAllText}>Mark All</Text>
          </Pressable>
        )}
      </View>

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
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllButtonPressed: {
    opacity: 0.6,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  listContent: {
    paddingBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 76,
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
});
