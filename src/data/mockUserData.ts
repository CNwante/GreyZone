/**
 * Mock User Profile & Settings Data
 * Used for Settings/Profile screen (SET-001)
 */

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  subscriptionTier: "free" | "premium" | "pro";
  memberSince: string;
  bio?: string;
}

export interface UserSettings {
  currency: "USD" | "EUR" | "GBP" | "JPY" | "CNY";
  language: "en" | "es" | "fr" | "de" | "zh" | "ja";
  notifications: {
    priceAlerts: boolean;
    aiPredictions: boolean;
    rugPullWarnings: boolean;
    portfolioUpdates: boolean;
    newsAndUpdates: boolean;
    pushEnabled: boolean;
    emailEnabled: boolean;
  };
  appearance: {
    theme: "dark" | "light" | "auto";
    showBalances: boolean;
  };
  security: {
    biometricEnabled: boolean;
    twoFactorEnabled: boolean;
  };
}

export const mockUserProfile: UserProfile = {
  id: "user_12345",
  firstName: "David",
  lastName: "Caulcrick",
  username: "davidc",
  email: "david@greyzone.app",
  isPremium: true,
  subscriptionTier: "premium",
  memberSince: "2024-01-15",
  bio: "Crypto enthusiast and long-term investor",
};

export const mockUserSettings: UserSettings = {
  currency: "USD",
  language: "en",
  notifications: {
    priceAlerts: true,
    aiPredictions: true,
    rugPullWarnings: true,
    portfolioUpdates: true,
    newsAndUpdates: false,
    pushEnabled: true,
    emailEnabled: true,
  },
  appearance: {
    theme: "dark",
    showBalances: true,
  },
  security: {
    biometricEnabled: true,
    twoFactorEnabled: false,
  },
};

// App version info
export const appVersion = {
  version: "1.0.0",
  buildNumber: "123",
};
