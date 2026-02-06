/**
 * Color palette for GreyZone app
 * Following dark theme spec from design
 */

export const Colors = {
  // Primary Colors
  primary: "#246BFD",
  primaryDark: "#1A54E0",

  // Success/Gain
  success: "#00D084",
  successLight: "#00E890",

  // Error/Loss
  error: "#FF4757",
  errorLight: "#FF5A6A",

  // Warning/Alert (for notifications)
  warning: "#FFB800",

  // Chart-specific colors
  purple: "#9945FF", // For Solana, pie charts, etc.

  // Background
  background: "#0D0D14",
  backgroundCard: "#1A1A24",
  backgroundInput: "#151521",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  textTertiary: "#666666",

  // Borders
  border: "#2A2A3A",
  borderLight: "#3A3A4A",

  // Badge
  badgeBackground: "#FF4757",
  badgeText: "#FFFFFF",

  // Transparent overlays
  overlay: "rgba(0, 0, 0, 0.7)",
} as const;

// Chart color palette (for pie charts, bar charts, etc.)
export const ChartColors = [
  Colors.primary, // #246BFD - Blue (Bitcoin)
  Colors.success, // #00D084 - Green (Ethereum)
  Colors.purple, // #9945FF - Purple (Solana)
  Colors.warning, // #FFB800 - Orange (Others)
  Colors.error, // #FF4757 - Red
  Colors.successLight, // #00E890 - Light Green
] as const;

export type ColorKey = keyof typeof Colors;
