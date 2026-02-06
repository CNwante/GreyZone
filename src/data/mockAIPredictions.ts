/**
 * Mock data for AI Predictions Hub (AI-002)
 * AI-powered price predictions with confidence scores
 */

export type PredictionSentiment = "bullish" | "bearish" | "neutral";
export type PredictionTimeframe = "1h" | "24h" | "7d" | "14d" | "30d";

export interface AIPrediction {
  id: string;
  coinId: string;
  coinSymbol: string;
  coinName: string;
  coinLogo: string;
  sentiment: PredictionSentiment;
  currentPrice: number;
  targetPrice: number;
  priceChange: number;
  priceChangePercent: number;
  confidence: number; // 0-100
  timeframe: PredictionTimeframe;
  prediction: string;
  reasoning: string[];
  createdAt: Date;
  isYourCoin: boolean; // User holds this coin
}

export interface MarketSentiment {
  fearGreedIndex: number; // 0-100 (0=Extreme Fear, 100=Extreme Greed)
  fearGreedLabel: string;
  socialSentiment: string;
  trendingTopics: string[];
  bullishPercentage: number;
  bearishPercentage: number;
}

export const mockAIPredictions: AIPrediction[] = [
  // Bullish Predictions
  {
    id: "pred-1",
    coinId: "bitcoin",
    coinSymbol: "BTC",
    coinName: "Bitcoin",
    coinLogo: "₿",
    sentiment: "bullish",
    currentPrice: 45234.56,
    targetPrice: 52000,
    priceChange: 6765.44,
    priceChangePercent: 14.96,
    confidence: 87,
    timeframe: "7d",
    prediction: "BTC likely to rise 15% within 7 days",
    reasoning: [
      "Strong technical breakout above $44K resistance",
      "Institutional buying pressure increasing",
      "Fear & Greed Index shows bullish sentiment",
      "On-chain metrics indicate accumulation",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isYourCoin: true,
  },
  {
    id: "pred-2",
    coinId: "ethereum",
    coinSymbol: "ETH",
    coinName: "Ethereum",
    coinLogo: "Ξ",
    sentiment: "bullish",
    currentPrice: 2456.78,
    targetPrice: 2800,
    priceChange: 343.22,
    priceChangePercent: 13.97,
    confidence: 72,
    timeframe: "14d",
    prediction: "ETH expected to gain 14% in 2 weeks",
    reasoning: [
      "Upcoming network upgrade driving optimism",
      "DeFi activity increasing significantly",
      "ETH/BTC ratio showing strength",
      "Staking rewards attracting long-term holders",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    isYourCoin: true,
  },
  {
    id: "pred-3",
    coinId: "solana",
    coinSymbol: "SOL",
    coinName: "Solana",
    coinLogo: "◎",
    sentiment: "bullish",
    currentPrice: 98.45,
    targetPrice: 115,
    priceChange: 16.55,
    priceChangePercent: 16.81,
    confidence: 68,
    timeframe: "7d",
    prediction: "SOL poised for 17% rally this week",
    reasoning: [
      "Network activity at all-time high",
      "Major partnerships announced",
      "Token unlock FUD already priced in",
      "Strong social media momentum",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    isYourCoin: true,
  },
  {
    id: "pred-4",
    coinId: "cardano",
    coinSymbol: "ADA",
    coinName: "Cardano",
    coinLogo: "₳",
    sentiment: "bullish",
    currentPrice: 0.48,
    targetPrice: 0.58,
    priceChange: 0.1,
    priceChangePercent: 20.83,
    confidence: 65,
    timeframe: "30d",
    prediction: "ADA could surge 21% next month",
    reasoning: [
      "Smart contract adoption growing",
      "Treasury proposals gaining traction",
      "Undervalued relative to competitors",
      "Positive developer activity metrics",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    isYourCoin: false,
  },

  // Bearish Predictions
  {
    id: "pred-5",
    coinId: "ripple",
    coinSymbol: "XRP",
    coinName: "Ripple",
    coinLogo: "✕",
    sentiment: "bearish",
    currentPrice: 0.52,
    targetPrice: 0.45,
    priceChange: -0.07,
    priceChangePercent: -13.46,
    confidence: 61,
    timeframe: "7d",
    prediction: "XRP may drop 13% in the coming week",
    reasoning: [
      "Legal uncertainty creating selling pressure",
      "Whale wallets showing distribution",
      "Technical breakdown below key support",
      "Volume declining significantly",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    isYourCoin: false,
  },
  {
    id: "pred-6",
    coinId: "dogecoin",
    coinSymbol: "DOGE",
    coinName: "Dogecoin",
    coinLogo: "Ð",
    sentiment: "bearish",
    currentPrice: 0.08,
    targetPrice: 0.07,
    priceChange: -0.01,
    priceChangePercent: -12.5,
    confidence: 58,
    timeframe: "14d",
    prediction: "DOGE likely to decline 12% over 2 weeks",
    reasoning: [
      "Meme coin hype cycle cooling down",
      "Social media mentions decreasing",
      "No significant development updates",
      "Profit-taking after recent pump",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
    isYourCoin: false,
  },

  // Neutral/Mixed Predictions
  {
    id: "pred-7",
    coinId: "polygon",
    coinSymbol: "MATIC",
    coinName: "Polygon",
    coinLogo: "⬡",
    sentiment: "neutral",
    currentPrice: 0.85,
    targetPrice: 0.88,
    priceChange: 0.03,
    priceChangePercent: 3.53,
    confidence: 52,
    timeframe: "7d",
    prediction: "MATIC to remain range-bound with slight upside",
    reasoning: [
      "Consolidating after recent gains",
      "Market awaiting zkEVM developments",
      "Mixed technical indicators",
      "Moderate trading volume",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isYourCoin: false,
  },
  {
    id: "pred-8",
    coinId: "avalanche",
    coinSymbol: "AVAX",
    coinName: "Avalanche",
    coinLogo: "🔺",
    sentiment: "bullish",
    currentPrice: 35.67,
    targetPrice: 42,
    priceChange: 6.33,
    priceChangePercent: 17.75,
    confidence: 70,
    timeframe: "14d",
    prediction: "AVAX positioned for 18% gain in 2 weeks",
    reasoning: [
      "Subnet ecosystem expanding rapidly",
      "Gaming partnerships driving adoption",
      "Strong validator participation",
      "Technical chart showing bullish divergence",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    isYourCoin: false,
  },
  {
    id: "pred-9",
    coinId: "chainlink",
    coinSymbol: "LINK",
    coinName: "Chainlink",
    coinLogo: "⬡",
    sentiment: "bullish",
    currentPrice: 14.23,
    targetPrice: 16.5,
    priceChange: 2.27,
    priceChangePercent: 15.95,
    confidence: 75,
    timeframe: "7d",
    prediction: "LINK to rally 16% this week",
    reasoning: [
      "Oracle services demand increasing",
      "New integrations announced",
      "Accumulation pattern on charts",
      "Positive correlation with DeFi growth",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    isYourCoin: false,
  },
  {
    id: "pred-10",
    coinId: "polkadot",
    coinSymbol: "DOT",
    coinName: "Polkadot",
    coinLogo: "●",
    sentiment: "bullish",
    currentPrice: 7.89,
    targetPrice: 9.2,
    priceChange: 1.31,
    priceChangePercent: 16.6,
    confidence: 64,
    timeframe: "30d",
    prediction: "DOT expected to climb 17% next month",
    reasoning: [
      "Parachain auctions driving interest",
      "Ecosystem development accelerating",
      "Undervalued vs market cap peers",
      "Community sentiment improving",
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isYourCoin: false,
  },
];

export const mockMarketSentiment: MarketSentiment = {
  fearGreedIndex: 68,
  fearGreedLabel: "Greed",
  socialSentiment: "Bullish trending",
  trendingTopics: ["Bitcoin ETF", "Ethereum 2.0", "DeFi Summer", "Alt Season"],
  bullishPercentage: 72,
  bearishPercentage: 28,
};

/**
 * Filter predictions by sentiment
 */
export function filterPredictionsBySentiment(
  predictions: AIPrediction[],
  sentiment: "all" | PredictionSentiment
): AIPrediction[] {
  if (sentiment === "all") {
    return predictions;
  }
  return predictions.filter((pred) => pred.sentiment === sentiment);
}

/**
 * Filter predictions for user's coins only
 */
export function filterUserCoinPredictions(
  predictions: AIPrediction[]
): AIPrediction[] {
  return predictions.filter((pred) => pred.isYourCoin);
}

/**
 * Get sentiment color
 */
export function getSentimentColor(sentiment: PredictionSentiment): string {
  switch (sentiment) {
    case "bullish":
      return "#00D084"; // Success green
    case "bearish":
      return "#FF4757"; // Error red
    case "neutral":
      return "#A0A0A0"; // Gray
    default:
      return "#246BFD"; // Primary blue
  }
}

/**
 * Get sentiment icon
 */
export function getSentimentIcon(sentiment: PredictionSentiment): string {
  switch (sentiment) {
    case "bullish":
      return "trending-up";
    case "bearish":
      return "trending-down";
    case "neutral":
      return "remove";
    default:
      return "help";
  }
}

/**
 * Get confidence badge color
 */
export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return "#00D084"; // High confidence - green
  if (confidence >= 60) return "#FFB800"; // Medium confidence - yellow
  return "#FF4757"; // Low confidence - red
}

/**
 * Get Fear & Greed label and color
 */
export function getFearGreedInfo(index: number): {
  label: string;
  color: string;
} {
  if (index >= 75) {
    return { label: "Extreme Greed", color: "#00D084" };
  } else if (index >= 55) {
    return { label: "Greed", color: "#7FE7A3" };
  } else if (index >= 45) {
    return { label: "Neutral", color: "#A0A0A0" };
  } else if (index >= 25) {
    return { label: "Fear", color: "#FFB800" };
  } else {
    return { label: "Extreme Fear", color: "#FF4757" };
  }
}

/**
 * Format timeframe
 */
export function formatTimeframe(timeframe: PredictionTimeframe): string {
  switch (timeframe) {
    case "1h":
      return "1 hour";
    case "24h":
      return "24 hours";
    case "7d":
      return "7 days";
    case "14d":
      return "14 days";
    case "30d":
      return "30 days";
    default:
      return timeframe;
  }
}

/**
 * Format time ago
 */
export function formatPredictionTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (hours < 1) return "Just now";
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}
