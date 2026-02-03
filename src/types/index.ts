/**
 * Core type definitions for GreyZone crypto portfolio app
 */

// ============================================================================
// User Types
// ============================================================================

export interface User {
  firstName: string;
  avatar?: string;
  unreadNotifications: number;
}

// ============================================================================
// Portfolio Types
// ============================================================================

export interface Portfolio {
  totalValue: number;
  change24h: number;
  changePercent24h: number;
  chartData: number[];
}

export interface Holding {
  coinId: string;
  symbol: string;
  name: string;
  logo: string;
  value: number;
  amount: number;
  change24h: number;
  changePercent24h: number;
}

// ============================================================================
// AI Prediction Types
// ============================================================================

export interface AIInsight {
  id: string;
  coinSymbol: string;
  prediction: string;
  confidence: number; // 0-100
  timeframe: string;
}

// ============================================================================
// Market Types
// ============================================================================

export interface MarketMover {
  coinId: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
  changePercent24h: number;
}

// ============================================================================
// Notification Types
// ============================================================================

export interface Notification {
  id: string;
  type: "price_alert" | "transaction" | "news" | "ai_insight";
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  icon?: string;
  coinSymbol?: string;
}

// ============================================================================
// Screen Data Types
// ============================================================================

export interface HomeScreenData {
  user: User;
  portfolio: Portfolio;
  holdings: Holding[];
  aiInsights: AIInsight[];
  marketMovers: MarketMover[];
}

// ============================================================================
// UI State Types
// ============================================================================

export type LoadingState = "idle" | "loading" | "loaded" | "empty" | "error";

export interface ErrorState {
  message: string;
  code?: string;
}

// ============================================================================
// Navigation Types
// ============================================================================

export type RootTabParamList = {
  Home: undefined;
  Portfolio: undefined;
  AI: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  EmptyHome: undefined;
  CoinDetail: { coinId: string };
  AIInsightDetail: { insightId: string };
};
