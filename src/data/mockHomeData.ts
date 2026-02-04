import { HomeScreenData } from "../types";

/**
 * Mock data for Home Screen
 * Used to demonstrate UI states without real API
 */
export const mockHomeData: HomeScreenData = {
  user: {
    firstName: "Chuks",
    unreadNotifications: 3,
  },

  portfolio: {
    totalValue: 47832.56,
    change24h: 1234.56,
    changePercent24h: 2.65,
    // Sparkline data points (7 days)
    chartData: [45000, 45500, 44800, 46000, 47200, 46800, 47832],
  },

  holdings: [
    {
      coinId: "bitcoin",
      symbol: "BTC",
      name: "Bitcoin",
      logo: "₿",
      value: 28456.0,
      amount: 0.63,
      change24h: 856.32,
      changePercent24h: 3.2,
    },
    {
      coinId: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      logo: "Ξ",
      value: 12890.0,
      amount: 5.2,
      change24h: 228.12,
      changePercent24h: 1.8,
    },
    {
      coinId: "solana",
      symbol: "SOL",
      name: "Solana",
      logo: "◎",
      value: 4256.0,
      amount: 43.2,
      change24h: -21.34,
      changePercent24h: -0.5,
    },
    {
      coinId: "cardano",
      symbol: "ADA",
      name: "Cardano",
      logo: "₳",
      value: 2230.0,
      amount: 5234,
      change24h: 45.67,
      changePercent24h: 2.1,
    },
  ],

  aiInsights: [
    {
      id: "1",
      coinSymbol: "BTC",
      prediction: "BTC likely to rise 12% within 7 days",
      confidence: 87,
      timeframe: "7 days",
    },
    {
      id: "2",
      coinSymbol: "ETH",
      prediction: "ETH showing strong upward momentum",
      confidence: 76,
      timeframe: "3 days",
    },
  ],

  marketMovers: [
    {
      coinId: "bitcoin",
      symbol: "BTC",
      name: "Bitcoin",
      logo: "₿",
      price: 45234.56,
      change24h: 1234.56,
      changePercent24h: 3.2,
    },
    {
      coinId: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      logo: "Ξ",
      price: 2456.78,
      change24h: 43.21,
      changePercent24h: 1.8,
    },
    {
      coinId: "solana",
      symbol: "SOL",
      name: "Solana",
      logo: "◎",
      price: 98.45,
      change24h: -0.49,
      changePercent24h: -0.5,
    },
    {
      coinId: "dogecoin",
      symbol: "DOGE",
      name: "Dogecoin",
      logo: "Ð",
      price: 0.08,
      change24h: 0.006,
      changePercent24h: 8.2,
    },
    {
      coinId: "cardano",
      symbol: "ADA",
      name: "Cardano",
      logo: "₳",
      price: 0.42,
      change24h: 0.009,
      changePercent24h: 2.1,
    },
  ],
};

/**
 * Mock data for empty portfolio state
 */
export const mockEmptyData: HomeScreenData = {
  user: {
    firstName: "Chuks",
    unreadNotifications: 0,
  },
  portfolio: {
    totalValue: 0,
    change24h: 0,
    changePercent24h: 0,
    chartData: [],
  },
  holdings: [],
  aiInsights: [],
  marketMovers: [
    // Keep market movers even in empty state for discovery
    ...mockHomeData.marketMovers,
  ],
};
