import { Holding } from "../types";

// Extended portfolio data for the full portfolio screen
export interface PortfolioData {
  totalValue: number;
  change24h: number;
  changePercent24h: number;
  chartData: number[]; // 7d sparkline for home
  performanceData: {
    "1D": number[];
    "1W": number[];
    "1M": number[];
    "3M": number[];
    "1Y": number[];
    ALL: number[];
  };
  performanceLabels: {
    "1D": string[];
    "1W": string[];
    "1M": string[];
    "3M": string[];
    "1Y": string[];
    ALL: string[];
  };
}

// Mock performance data for different time ranges
export const mockPortfolioData: PortfolioData = {
  totalValue: 47832.56,
  change24h: 1234.56,
  changePercent24h: 2.65,
  chartData: [45000, 46200, 44800, 47000, 48200, 47500, 47832], // 7 days for sparkline

  performanceData: {
    "1D": [47500, 47600, 47450, 47700, 47650, 47800, 47750, 47832],
    "1W": [45000, 46200, 44800, 47000, 48200, 47500, 47832],
    "1M": [42000, 43500, 45000, 44000, 46000, 47000, 46500, 47832],
    "3M": [38000, 40000, 42000, 41000, 43000, 45000, 46000, 47832],
    "1Y": [
      35000, 38000, 36000, 40000, 42000, 41000, 43000, 45000, 44000, 46000,
      47000, 47832,
    ],
    ALL: [
      20000, 25000, 22000, 28000, 32000, 30000, 35000, 38000, 36000, 40000,
      42000, 47832,
    ],
  },

  performanceLabels: {
    "1D": ["9AM", "12PM", "3PM", "6PM", "9PM", "12AM", "3AM", "Now"],
    "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "1M": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "3M": ["Month 1", "Month 2", "Month 3"],
    "1Y": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    ALL: ["2020", "2021", "2022", "2023", "2024", "2025"],
  },
};

// Calculate allocation percentages for pie chart
export const calculateAllocation = (holdings: Holding[]) => {
  const total = holdings.reduce((sum, holding) => sum + holding.value, 0);

  return holdings.map((holding) => ({
    ...holding,
    percentage: (holding.value / total) * 100,
  }));
};
