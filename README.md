# GreyZone

A modern cross-platform crypto portfolio tracker built with React Native and Expo.

**Demo Link**: https://drive.google.com/file/d/1B_oOot5w1GDeDNR0Y5QpEkwgL0KEN2BC/view?usp=drivesdk

---

## Quick Start

### Prerequisites

- Node.js 20+ and npm/yarn
- Expo Go app on your mobile device (iOS/Android)

### Installation

```bash
# Clone the repository
git clone https://github.com/CNwante/GreyZone.git
cd GreyZone

# Install dependencies
npm install

# Start the development server
npx expo start --offline
```

### Testing the App

**Option 1: Mobile Device (Recommended)**

1. Open Expo Go app on your phone
2. Scan the QR code from the terminal
3. App will load on your device

**Option 2: Web Browser**

1. Press `w` in the terminal after starting the server
2. App will open in your default browser

---

## Tech Stack

- **Framework**: React Native (Expo SDK 52)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **Styling**: React Native StyleSheet API
- **Icons**: Expo Vector Icons (Ionicons)
- **State**: React Hooks (useState, useEffect, useRef)

### Key Dependencies

```json
{
  "expo": "~52.0.29",
  "react": "18.3.1",
  "react-native": "0.76.6",
  "@react-navigation/native": "^7.0.13",
  "@react-navigation/bottom-tabs": "^7.2.3",
  "@react-navigation/native-stack": "^7.2.1",
  "react-native-gesture-handler": "^2.20.2"
}
```

---

## Project Structure

```
GreyZone/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screen components
│   ├── navigation/          # Navigation configuration
│   ├── data/               # Mock data
│   ├── constants/          # Colors, themes, constants
│   └── types/              # TypeScript type definitions
├── assets/                 # Images and icons
├── App.tsx                 # Entry point
└── package.json
```

---

## What Was Implemented

### Core Screens (HOME-001, HOME-002, HOME-003)

- **Home Dashboard** with portfolio overview, holdings list, AI insights, and market movers
- **Empty State Screen** for new users with onboarding CTAs
- **Notifications Screen** with categorized notifications (Today, Yesterday, Earlier)
- Pull-to-refresh, loading states, and error handling

### Quick Actions & Wallet Flows

- **Send Crypto**: Asset selection, recipient input, amount with percentage buttons, network fees
- **Receive Crypto**: Asset selection, network toggle, QR code display, copy/share address
- **Swap Crypto**: From/To asset selection, live rate calculation, slippage settings
- **Buy Crypto**: Fiat on-ramp UI with payment method integration (MoonPay)

### Transaction Flows

- **Confirmation Screens**: Review transaction details before execution
- **Success Screen**: Universal success handler with transaction details
- **Error Screen**: Error handling with retry options and support access
- **Processing States**: Loading indicators with realistic 2-second simulations

### Navigation

- **Bottom Tab Navigation**: Home, Portfolio, AI, Notifications, Profile
- **Stack Navigation**: Nested navigation within Home tab
- **Type-Safe Routing**: Full TypeScript support for navigation params

### Components

- Reusable components: `Header`, `PortfolioCard`, `QuickActions`, `HoldingsList`, `MarketMovers`
- AI Insights cards with confidence indicators
- Notification rows with swipe-to-delete
- Market mover horizontal carousel

### UI States

- Loading states with skeletons
- Empty states with actionable CTAs
- Error states with retry functionality
- Refreshing with pull-to-refresh

---

## What Was Mocked

All data is **hardcoded** for demonstration purposes:

- **User Data**: Profile information, preferences
- **Portfolio Data**: Total value, 24h changes, chart data
- **Holdings**: Bitcoin, Ethereum, Solana, Cardano with amounts and values
- **AI Predictions**: Confidence scores, predictions, timeframes
- **Market Data**: Market movers, price changes, trending coins
- **Notifications**: Price alerts, AI insights, portfolio updates
- **Transaction Processing**: 2-second simulated delays

Mock data files:

- `src/data/mockHomeData.ts`
- `src/data/mockPortfolioData.ts`
- `src/data/mockNotifications.ts`
- `src/data/mockUserData.ts`

---

## What Was Intentionally Skipped

Following the assessment guidelines, these features were **not implemented**:

### Full Feature Implementations

- Real API integration
- Live price updates
- Real-time chart rendering
- Actual blockchain transactions
- Payment provider webview integration (MoonPay/Transak)
- QR code generation and scanning
- Clipboard integration
- Camera access for QR scanning

### Additional Screens

- Portfolio Detail Screen (PORT-001)
- Coin Detail Screen (COIN-003) - partially implemented
- AI Chat Screen (AI-001)
- Market Discovery Screen (COIN-001) - basic version exists
- Settings sub-screens (Security, Subscription, etc.)
- Transaction History

### Advanced Features

- Real-time WebSocket connections
- Push notifications
- Biometric authentication
- Multi-wallet support
- DeFi protocol integrations
- Advanced charting (TradingView-style)
- Social features (discussion threads, social feed)

---

## Next Steps (Given More Time)

### Code Quality & Architecture

- **Code Cleanup**: Remove redundant code and improve organization
- **Refactoring**: Extract common patterns, reduce duplication
- **State Management**: Implement Redux Toolkit or TanStack Query for global state
- **API Layer**: Create proper API service layer with React Query for caching
- **Error Boundaries**: Add React error boundaries for graceful error handling

### UI/UX Improvements

- Fix minor spacing and alignment issues
- Add micro-interactions and animations (React Native Reanimated)
- Implement proper skeleton loaders
- Add haptic feedback for button presses
- Improve accessibility (screen reader support, dynamic font sizes)
- Dark/Light theme toggle with persistent preferences

### Feature Completion

- Complete all navigation flows from documentation
- Implement actual QR code generation (`react-native-qrcode-svg`)
- Add camera QR scanning (`expo-camera`)
- Implement native clipboard (`@react-native-clipboard/clipboard`)
- Add real chart library (Victory Native or Recharts)
- Complete Settings screens with working preferences

### Performance Optimization

- Implement FlatList optimization (virtualization, pagination)
- Add image caching for coin logos
- Optimize re-renders with React.memo and useMemo
- Implement lazy loading for screens
- Add performance monitoring

### Testing

- Unit tests with Jest
- Component tests with React Native Testing Library
- E2E tests with Detox
- Type safety improvements with stricter TypeScript config

---

## License

This project is part of a take-home assessment and is for demonstration purposes only.

---

## Author

Solomon C. Nwante
