import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Notification } from "../types";
import { Colors } from "../constants/colors";

interface NotificationRowProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export default function NotificationRow({
  notification,
  onPress,
}: NotificationRowProps) {
  const getTimeAgo = (timestamp: Date) => {
    const now = Date.now();
    const diff = now - timestamp.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "ai_insight":
        return { name: "sparkles" as const, color: Colors.primary };
      case "price_alert":
        return { name: "notifications" as const, color: Colors.warning };
      case "transaction":
        return { name: "checkmark-circle" as const, color: Colors.success };
      case "news":
        return { name: "newspaper" as const, color: Colors.primary };
      default:
        return {
          name: "information-circle" as const,
          color: Colors.textSecondary,
        };
    }
  };

  const getIconContainerStyle = () => {
    switch (notification.type) {
      case "ai_insight":
        return {
          backgroundColor: Colors.primary + "15",
          borderColor: Colors.primary + "40",
        };
      case "price_alert":
        return {
          backgroundColor: Colors.warning + "15",
          borderColor: Colors.warning + "40",
        };
      case "transaction":
        return {
          backgroundColor: Colors.success + "15",
          borderColor: Colors.success + "40",
        };
      case "news":
        return {
          backgroundColor: Colors.primary + "15",
          borderColor: Colors.primary + "40",
        };
      default:
        return {
          backgroundColor: Colors.backgroundCard,
          borderColor: Colors.border,
        };
    }
  };

  const iconData = getNotificationIcon();
  const iconContainerStyle = getIconContainerStyle();

  return (
    <Pressable
      onPress={() => onPress(notification)}
      style={({ pressed }) => [
        styles.container,
        !notification.isRead && styles.unreadContainer,
        pressed && styles.containerPressed,
      ]}
    >
      {/* Icon */}
      <View style={[styles.iconContainer, iconContainerStyle]}>
        <Ionicons name={iconData.name} size={24} color={iconData.color} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text
            style={[styles.title, !notification.isRead && styles.unreadTitle]}
          >
            {notification.title}
          </Text>
          <Text style={styles.time}>{getTimeAgo(notification.timestamp)}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {notification.description}
        </Text>

        {notification.coinSymbol && (
          <View style={styles.coinBadge}>
            <Text style={styles.coinSymbolText}>{notification.coinSymbol}</Text>
          </View>
        )}
      </View>

      {/* Unread Indicator */}
      {!notification.isRead && <View style={styles.unreadDot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.background,
    gap: 12,
  },
  unreadContainer: {
    backgroundColor: Colors.backgroundCard,
  },
  containerPressed: {
    opacity: 0.7,
  },

  // Icon
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  icon: {
    fontSize: 24,
  },

  // Content
  content: {
    flex: 1,
    gap: 6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  unreadTitle: {
    fontWeight: "700",
  },
  time: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  coinBadge: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primary + "20",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  coinSymbolText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
  },

  // Unread Indicator
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginTop: 4,
  },
});
