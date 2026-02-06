/**
 * Mock data for Alerts (ALERT-001)
 * Active alerts, triggered alerts, and rug pull warnings
 */

export type AlertType = "price" | "percentage" | "rug_pull";
export type AlertStatus = "active" | "triggered" | "expired";
export type AlertCondition = "above" | "below" | "change_up" | "change_down";

export interface Alert {
  id: string;
  type: AlertType;
  coinId: string;
  coinSymbol: string;
  coinName: string;
  coinLogo: string;
  condition: AlertCondition;
  targetValue: number;
  currentValue?: number;
  status: AlertStatus;
  createdAt: Date;
  triggeredAt?: Date;
  message: string;
}

export interface RugPullWarning {
  id: string;
  coinSymbol: string;
  coinName: string;
  riskScore: number; // 0-100
  reason: string;
  detectedAt: Date;
  severity: "low" | "medium" | "high" | "critical";
}

export const mockAlerts: Alert[] = [
  // Active Alerts
  {
    id: "alert-1",
    type: "price",
    coinId: "bitcoin",
    coinSymbol: "BTC",
    coinName: "Bitcoin",
    coinLogo: "₿",
    condition: "above",
    targetValue: 50000,
    currentValue: 45234.56,
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    message: "BTC > $50,000",
  },
  {
    id: "alert-2",
    type: "percentage",
    coinId: "ethereum",
    coinSymbol: "ETH",
    coinName: "Ethereum",
    coinLogo: "Ξ",
    condition: "change_down",
    targetValue: 5,
    currentValue: 2456.78,
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    message: "ETH drops 5% in 1h",
  },
  {
    id: "alert-3",
    type: "price",
    coinId: "solana",
    coinSymbol: "SOL",
    coinName: "Solana",
    coinLogo: "◎",
    condition: "below",
    targetValue: 90,
    currentValue: 98.45,
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    message: "SOL < $90",
  },

  // Triggered Alerts
  {
    id: "alert-4",
    type: "price",
    coinId: "cardano",
    coinSymbol: "ADA",
    coinName: "Cardano",
    coinLogo: "₳",
    condition: "above",
    targetValue: 0.45,
    currentValue: 0.48,
    status: "triggered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    triggeredAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    message: "ADA > $0.45",
  },
  {
    id: "alert-5",
    type: "percentage",
    coinId: "dogecoin",
    coinSymbol: "DOGE",
    coinName: "Dogecoin",
    coinLogo: "Ð",
    condition: "change_up",
    targetValue: 8,
    currentValue: 0.08,
    status: "triggered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    triggeredAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    message: "DOGE rises 8% in 1h",
  },
  {
    id: "alert-6",
    type: "price",
    coinId: "polygon",
    coinSymbol: "MATIC",
    coinName: "Polygon",
    coinLogo: "⬡",
    condition: "below",
    targetValue: 0.9,
    currentValue: 0.85,
    status: "triggered",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    triggeredAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    message: "MATIC < $0.90",
  },
];

export const mockRugPullWarnings: RugPullWarning[] = [
  {
    id: "rug-1",
    coinSymbol: "SCAM",
    coinName: "ScamCoin",
    riskScore: 95,
    reason: "Liquidity removed - 98% of liquidity pulled",
    detectedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    severity: "critical",
  },
  {
    id: "rug-2",
    coinSymbol: "SUSP",
    coinName: "SuspiciousCoin",
    riskScore: 78,
    reason: "Wallet concentration - Top 10 wallets hold 85%",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    severity: "high",
  },
  {
    id: "rug-3",
    coinSymbol: "WARN",
    coinName: "WarningToken",
    riskScore: 62,
    reason: "Contract not verified - Unable to audit smart contract",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    severity: "medium",
  },
];

/**
 * Filter alerts by status
 */
export function filterAlertsByStatus(
  alerts: Alert[],
  status: "active" | "triggered" | "all"
): Alert[] {
  if (status === "all") {
    return alerts;
  }
  return alerts.filter((alert) => alert.status === status);
}

/**
 * Get alert icon based on condition
 */
export function getAlertIcon(condition: AlertCondition): string {
  switch (condition) {
    case "above":
      return "arrow-up-circle";
    case "below":
      return "arrow-down-circle";
    case "change_up":
      return "trending-up";
    case "change_down":
      return "trending-down";
    default:
      return "notifications";
  }
}

/**
 * Get alert color based on condition
 */
export function getAlertColor(condition: AlertCondition): string {
  switch (condition) {
    case "above":
    case "change_up":
      return "#00D084"; // Success green
    case "below":
    case "change_down":
      return "#FF4757"; // Error red
    default:
      return "#246BFD"; // Primary blue
  }
}

/**
 * Get rug pull warning color based on severity
 */
export function getRugPullColor(severity: RugPullWarning["severity"]): string {
  switch (severity) {
    case "critical":
      return "#FF4757"; // Red
    case "high":
      return "#FF6B6B"; // Light red
    case "medium":
      return "#FFB800"; // Yellow
    case "low":
      return "#FFA500"; // Orange
    default:
      return "#A0A0A0"; // Gray
  }
}

/**
 * Format time ago
 */
export function formatTimeAgo(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
