// Mock data for coin detail screen (COIN-003)

export interface CoinDetail {
  coinId: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  priceData: {
    "1H": number[];
    "24H": number[];
    "7D": number[];
    "1M": number[];
    "3M": number[];
    "1Y": number[];
    ALL: number[];
  };
  priceLabels: {
    "1H": string[];
    "24H": string[];
    "7D": string[];
    "1M": string[];
    "3M": string[];
    "1Y": string[];
    ALL: string[];
  };
  marketStats: {
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    maxSupply: number;
    ath: number;
    athDate: string;
  };
  userHolding?: {
    amount: number;
    value: number;
    avgBuyPrice: number;
    profitLoss: number;
    profitLossPercent: number;
  };
  about: string;
  isFavorite: boolean;
}

// Mock Bitcoin data
export const mockBitcoinData: CoinDetail = {
  coinId: "bitcoin",
  symbol: "BTC",
  name: "Bitcoin",
  logo: "₿",
  price: 45234.56,
  change24h: 1234.56,
  changePercent24h: 2.8,

  priceData: {
    "1H": [44800, 44900, 44850, 45000, 45100, 45050, 45234],
    "24H": [44000, 44200, 43800, 44500, 44800, 45000, 45234],
    "7D": [42000, 43000, 42500, 44000, 44500, 45000, 45234],
    "1M": [40000, 41000, 42000, 41500, 43000, 44000, 45234],
    "3M": [38000, 39000, 40000, 41000, 42000, 43000, 45234],
    "1Y": [
      35000, 37000, 36000, 38000, 40000, 42000, 44000, 43000, 44500, 45000,
      45234,
    ],
    ALL: [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45234],
  },

  priceLabels: {
    "1H": ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50", "11:00"],
    "24H": ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "Now"],
    "7D": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "1M": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "3M": ["Month 1", "Month 2", "Month 3"],
    "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    ALL: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  },

  marketStats: {
    marketCap: 890500000000, // $890.5B
    volume24h: 28300000000, // $28.3B
    circulatingSupply: 19500000, // 19.5M BTC
    maxSupply: 21000000, // 21M BTC
    ath: 69000,
    athDate: "Nov 2021",
  },

  userHolding: {
    amount: 0.63,
    value: 28497.77,
    avgBuyPrice: 42100,
    profitLoss: 3134.77,
    profitLossPercent: 7.4,
  },

  about:
    "Bitcoin is a decentralized digital currency that can be transferred on the peer-to-peer bitcoin network. Bitcoin transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain.",

  isFavorite: false,
};

// Mock Ethereum data
export const mockEthereumData: CoinDetail = {
  coinId: "ethereum",
  symbol: "ETH",
  name: "Ethereum",
  logo: "Ξ",
  price: 2456.78,
  change24h: 29.12,
  changePercent24h: 1.2,

  priceData: {
    "1H": [2440, 2445, 2438, 2450, 2455, 2452, 2456],
    "24H": [2427, 2430, 2425, 2440, 2445, 2450, 2456],
    "7D": [2350, 2380, 2360, 2400, 2420, 2440, 2456],
    "1M": [2200, 2250, 2300, 2280, 2350, 2400, 2456],
    "3M": [2000, 2100, 2150, 2200, 2300, 2350, 2456],
    "1Y": [1800, 1900, 1850, 2000, 2100, 2200, 2300, 2250, 2350, 2400, 2456],
    ALL: [500, 1000, 1500, 2000, 2500, 3000, 2800, 2456],
  },

  priceLabels: {
    "1H": ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50", "11:00"],
    "24H": ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "Now"],
    "7D": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "1M": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "3M": ["Month 1", "Month 2", "Month 3"],
    "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    ALL: ["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  },

  marketStats: {
    marketCap: 295000000000, // $295B
    volume24h: 15200000000, // $15.2B
    circulatingSupply: 120000000, // 120M ETH
    maxSupply: 0, // No max supply
    ath: 4878,
    athDate: "Nov 2021",
  },

  userHolding: {
    amount: 5.25,
    value: 12897.1,
    avgBuyPrice: 2200,
    profitLoss: 1347.1,
    profitLossPercent: 11.7,
  },

  about:
    "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether (ETH) is the native cryptocurrency of the platform and is used to pay for transaction fees and computational services.",

  isFavorite: true,
};

// Mock Solana data
export const mockSolanaData: CoinDetail = {
  coinId: "solana",
  symbol: "SOL",
  name: "Solana",
  logo: "◎",
  price: 98.45,
  change24h: -0.49,
  changePercent24h: -0.5,

  priceData: {
    "1H": [98.8, 98.9, 98.6, 98.7, 98.5, 98.4, 98.45],
    "24H": [98.94, 98.7, 98.9, 98.6, 98.5, 98.4, 98.45],
    "7D": [95.5, 96.5, 97.0, 97.5, 98.0, 98.5, 98.45],
    "1M": [90.0, 92.0, 93.5, 95.0, 96.5, 97.5, 98.45],
    "3M": [80.0, 85.0, 87.5, 90.0, 93.0, 95.0, 98.45],
    "1Y": [60.0, 65.0, 70.0, 75.0, 80.0, 85.0, 90.0, 92.0, 95.0, 97.0, 98.45],
    ALL: [10.0, 20.0, 40.0, 60.0, 80.0, 100.0, 120.0, 98.45],
  },

  priceLabels: {
    "1H": ["10:00", "10:10", "10:20", "10:30", "10:40", "10:50", "11:00"],
    "24H": ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "Now"],
    "7D": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "1M": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "3M": ["Month 1", "Month 2", "Month 3"],
    "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    ALL: ["2020", "2021", "2021.5", "2022", "2023", "2023.5", "2024", "Now"],
  },

  marketStats: {
    marketCap: 43500000000, // $43.5B
    volume24h: 2100000000, // $2.1B
    circulatingSupply: 442000000, // 442M SOL
    maxSupply: 0, // No max supply
    ath: 260,
    athDate: "Nov 2021",
  },

  userHolding: {
    amount: 43.25,
    value: 4257.96,
    avgBuyPrice: 95.0,
    profitLoss: 149.21,
    profitLossPercent: 3.6,
  },

  about:
    "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. Solana is known for its fast transaction speeds and low fees, making it popular for DeFi and NFT applications.",

  isFavorite: false,
};

// Helper function to get coin data by ID
export const getCoinDataById = (coinId: string): CoinDetail | null => {
  const coinMap: Record<string, CoinDetail> = {
    bitcoin: mockBitcoinData,
    ethereum: mockEthereumData,
    solana: mockSolanaData,
  };

  return coinMap[coinId] || null;
};
