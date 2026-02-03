import { Notification } from "../types";

/**
 * Mock notifications data
 * Grouped by time periods: Today, Yesterday, Earlier
 */
export const mockNotifications: Notification[] = [
  // Today
  {
    id: "1",
    type: "ai_insight",
    title: "New AI Prediction",
    description: "BTC likely to rise 12% in the next 7 days",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    isRead: false,
    icon: "🤖",
    coinSymbol: "BTC",
  },
  {
    id: "2",
    type: "price_alert",
    title: "Price Alert",
    description: "Bitcoin reached your target price of $45,000",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
    icon: "🔔",
    coinSymbol: "BTC",
  },
  {
    id: "3",
    type: "transaction",
    title: "Transaction Completed",
    description: "Received 0.05 BTC from wallet 0x7f2a...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    isRead: true,
    icon: "✅",
    coinSymbol: "BTC",
  },

  // Yesterday
  {
    id: "4",
    type: "news",
    title: "Market News",
    description: "Ethereum upgrade scheduled for next month",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
    icon: "📰",
    coinSymbol: "ETH",
  },
  {
    id: "5",
    type: "price_alert",
    title: "Price Alert",
    description: "Solana dropped below $100",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28), // 28 hours ago
    isRead: true,
    icon: "📉",
    coinSymbol: "SOL",
  },

  // Earlier
  {
    id: "6",
    type: "ai_insight",
    title: "AI Analysis Complete",
    description: "Your portfolio risk score has improved to 7.2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    isRead: true,
    icon: "📊",
  },
  {
    id: "7",
    type: "transaction",
    title: "Swap Successful",
    description: "Swapped 0.5 ETH for 5000 ADA",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    isRead: true,
    icon: "🔄",
    coinSymbol: "ETH",
  },
];

/**
 * Helper to group notifications by time period
 */
export const groupNotificationsByTime = (notifications: Notification[]) => {
  const now = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;
  const twoDays = oneDay * 2;

  const today: Notification[] = [];
  const yesterday: Notification[] = [];
  const earlier: Notification[] = [];

  notifications.forEach((notification) => {
    const diff = now - notification.timestamp.getTime();

    if (diff < oneDay) {
      today.push(notification);
    } else if (diff < twoDays) {
      yesterday.push(notification);
    } else {
      earlier.push(notification);
    }
  });

  return { today, yesterday, earlier };
};
