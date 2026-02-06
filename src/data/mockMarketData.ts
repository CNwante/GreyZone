/**
 * Mock data for Market Discovery (COIN-001)
 * Full cryptocurrency market list with filters
 */

export interface MarketCoin {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
  category: CoinCategory[];
  isNew?: boolean;
}

export type CoinCategory =
  | "DeFi"
  | "NFT"
  | "Layer 1"
  | "Layer 2"
  | "Meme"
  | "AI"
  | "Gaming"
  | "Metaverse"
  | "Exchange"
  | "Stablecoin";

export type MarketFilter = "All" | "Gainers" | "Losers" | "Trending" | "New";

export const mockMarketCoins: MarketCoin[] = [
  {
    id: "bitcoin",
    rank: 1,
    symbol: "BTC",
    name: "Bitcoin",
    logo: "₿",
    price: 45234.56,
    change24h: 1234.56,
    changePercent24h: 2.8,
    marketCap: 890500000000,
    volume24h: 28300000000,
    category: ["Layer 1"],
  },
  {
    id: "ethereum",
    rank: 2,
    symbol: "ETH",
    name: "Ethereum",
    logo: "Ξ",
    price: 2456.78,
    change24h: 28.45,
    changePercent24h: 1.2,
    marketCap: 295400000000,
    volume24h: 15200000000,
    category: ["Layer 1", "DeFi"],
  },
  {
    id: "tether",
    rank: 3,
    symbol: "USDT",
    name: "Tether",
    logo: "₮",
    price: 1.0,
    change24h: 0.0,
    changePercent24h: 0.0,
    marketCap: 95800000000,
    volume24h: 45600000000,
    category: ["Stablecoin"],
  },
  {
    id: "solana",
    rank: 4,
    symbol: "SOL",
    name: "Solana",
    logo: "◎",
    price: 98.45,
    change24h: -0.52,
    changePercent24h: -0.5,
    marketCap: 42300000000,
    volume24h: 2100000000,
    category: ["Layer 1", "DeFi"],
  },
  {
    id: "bnb",
    rank: 5,
    symbol: "BNB",
    name: "BNB",
    logo: "🔶",
    price: 312.89,
    change24h: 5.67,
    changePercent24h: 1.8,
    marketCap: 48200000000,
    volume24h: 1800000000,
    category: ["Exchange"],
  },
  {
    id: "xrp",
    rank: 6,
    symbol: "XRP",
    name: "XRP",
    logo: "✕",
    price: 0.62,
    change24h: 0.02,
    changePercent24h: 3.3,
    marketCap: 33500000000,
    volume24h: 1200000000,
    category: ["Layer 1"],
  },
  {
    id: "cardano",
    rank: 7,
    symbol: "ADA",
    name: "Cardano",
    logo: "₳",
    price: 0.48,
    change24h: 0.04,
    changePercent24h: 9.1,
    marketCap: 16800000000,
    volume24h: 450000000,
    category: ["Layer 1", "DeFi"],
  },
  {
    id: "dogecoin",
    rank: 8,
    symbol: "DOGE",
    name: "Dogecoin",
    logo: "Ð",
    price: 0.08,
    change24h: 0.0064,
    changePercent24h: 8.7,
    marketCap: 11200000000,
    volume24h: 680000000,
    category: ["Meme"],
  },
  {
    id: "polygon",
    rank: 9,
    symbol: "MATIC",
    name: "Polygon",
    logo: "⬡",
    price: 0.85,
    change24h: -0.03,
    changePercent24h: -3.4,
    marketCap: 7900000000,
    volume24h: 420000000,
    category: ["Layer 2", "DeFi"],
  },
  {
    id: "avalanche",
    rank: 10,
    symbol: "AVAX",
    name: "Avalanche",
    logo: "🔺",
    price: 36.72,
    change24h: 1.23,
    changePercent24h: 3.5,
    marketCap: 13500000000,
    volume24h: 380000000,
    category: ["Layer 1", "DeFi"],
  },
  {
    id: "chainlink",
    rank: 11,
    symbol: "LINK",
    name: "Chainlink",
    logo: "⬢",
    price: 14.56,
    change24h: 0.45,
    changePercent24h: 3.2,
    marketCap: 8200000000,
    volume24h: 320000000,
    category: ["DeFi"],
  },
  {
    id: "polkadot",
    rank: 12,
    symbol: "DOT",
    name: "Polkadot",
    logo: "●",
    price: 7.23,
    change24h: -0.15,
    changePercent24h: -2.0,
    marketCap: 9100000000,
    volume24h: 240000000,
    category: ["Layer 1"],
  },
  {
    id: "uniswap",
    rank: 13,
    symbol: "UNI",
    name: "Uniswap",
    logo: "🦄",
    price: 6.34,
    change24h: 0.21,
    changePercent24h: 3.4,
    marketCap: 4800000000,
    volume24h: 180000000,
    category: ["DeFi", "Exchange"],
  },
  {
    id: "litecoin",
    rank: 14,
    symbol: "LTC",
    name: "Litecoin",
    logo: "Ł",
    price: 72.45,
    change24h: 1.89,
    changePercent24h: 2.7,
    marketCap: 5400000000,
    volume24h: 420000000,
    category: ["Layer 1"],
  },
  {
    id: "shiba-inu",
    rank: 15,
    symbol: "SHIB",
    name: "Shiba Inu",
    logo: "🐕",
    price: 0.00000945,
    change24h: 0.00000078,
    changePercent24h: 9.0,
    marketCap: 5600000000,
    volume24h: 320000000,
    category: ["Meme"],
  },
  {
    id: "render",
    rank: 16,
    symbol: "RNDR",
    name: "Render",
    logo: "🎨",
    price: 7.89,
    change24h: 0.56,
    changePercent24h: 7.6,
    marketCap: 3100000000,
    volume24h: 180000000,
    category: ["AI", "Metaverse"],
    isNew: true,
  },
  {
    id: "injective",
    rank: 17,
    symbol: "INJ",
    name: "Injective",
    logo: "⚡",
    price: 34.12,
    change24h: 2.34,
    changePercent24h: 7.4,
    marketCap: 2800000000,
    volume24h: 120000000,
    category: ["DeFi", "Layer 1"],
    isNew: true,
  },
  {
    id: "aptos",
    rank: 18,
    symbol: "APT",
    name: "Aptos",
    logo: "🅰️",
    price: 9.87,
    change24h: 0.45,
    changePercent24h: 4.8,
    marketCap: 3900000000,
    volume24h: 150000000,
    category: ["Layer 1"],
    isNew: true,
  },
  {
    id: "arbitrum",
    rank: 19,
    symbol: "ARB",
    name: "Arbitrum",
    logo: "🔷",
    price: 1.23,
    change24h: -0.05,
    changePercent24h: -3.9,
    marketCap: 2100000000,
    volume24h: 95000000,
    category: ["Layer 2", "DeFi"],
  },
  {
    id: "optimism",
    rank: 20,
    symbol: "OP",
    name: "Optimism",
    logo: "🔴",
    price: 2.45,
    change24h: 0.12,
    changePercent24h: 5.1,
    marketCap: 2400000000,
    volume24h: 110000000,
    category: ["Layer 2", "DeFi"],
  },
];

/**
 * Filter coins by market filter type
 */
export function filterMarketCoins(
  coins: MarketCoin[],
  filter: MarketFilter
): MarketCoin[] {
  switch (filter) {
    case "All":
      return coins;
    case "Gainers":
      return coins
        .filter((coin) => coin.changePercent24h > 0)
        .sort((a, b) => b.changePercent24h - a.changePercent24h);
    case "Losers":
      return coins
        .filter((coin) => coin.changePercent24h < 0)
        .sort((a, b) => a.changePercent24h - b.changePercent24h);
    case "Trending":
      // Mock: Top movers by absolute % change
      return coins
        .slice()
        .sort(
          (a, b) => Math.abs(b.changePercent24h) - Math.abs(a.changePercent24h)
        )
        .slice(0, 10);
    case "New":
      return coins.filter((coin) => coin.isNew);
    default:
      return coins;
  }
}

/**
 * Filter coins by category
 */
export function filterByCategory(
  coins: MarketCoin[],
  category: CoinCategory
): MarketCoin[] {
  return coins.filter((coin) => coin.category.includes(category));
}

/**
 * Search coins by name or symbol
 */
export function searchCoins(coins: MarketCoin[], query: string): MarketCoin[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return coins;

  return coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(lowerQuery) ||
      coin.symbol.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get category summary
 */
export function getCategoryCount(category: CoinCategory): number {
  return mockMarketCoins.filter((coin) => coin.category.includes(category))
    .length;
}
