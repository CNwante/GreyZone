import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import {
  mockMarketCoins,
  filterMarketCoins,
  searchCoins,
  MarketFilter,
  CoinCategory,
} from "../data/mockMarketData";
import MarketCoinRow from "../components/MarketCoinRow";

const FILTER_TABS: MarketFilter[] = [
  "All",
  "Gainers",
  "Losers",
  "Trending",
  "New",
];

const CATEGORIES: CoinCategory[] = [
  "DeFi",
  "NFT",
  "Layer 1",
  "Layer 2",
  "Meme",
  "AI",
  "Gaming",
  "Metaverse",
];

export default function MarketDiscoveryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<MarketFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  // Apply filters and search
  let displayedCoins = filterMarketCoins(mockMarketCoins, selectedFilter);
  if (searchQuery.trim()) {
    displayedCoins = searchCoins(displayedCoins, searchQuery);
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search coins..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={Colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <FlatList
          data={FILTER_TABS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedFilter(item)}
              style={[
                styles.filterTab,
                selectedFilter === item && styles.filterTabActive,
              ]}
            >
              <Text
                style={[
                  styles.filterTabText,
                  selectedFilter === item && styles.filterTabTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
          contentContainerStyle={styles.filterList}
        />
      </View>

      {/* Coin List */}
      <FlatList
        data={displayedCoins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MarketCoinRow coin={item} />}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
        ListHeaderComponent={
          searchQuery.trim() === "" && selectedFilter === "All" ? (
            <View style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.categoriesGrid}>
                {CATEGORIES.map((category) => (
                  <Pressable
                    key={category}
                    style={styles.categoryChip}
                    onPress={() => {
                      // TODO: Navigate to filtered category view
                      console.log(`Navigate to ${category} category`);
                    }}
                  >
                    <Text style={styles.categoryChipText}>{category}</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color={Colors.textSecondary}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={64}
              color={Colors.textSecondary}
            />
            <Text style={styles.emptyText}>No coins found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 48,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
    paddingVertical: 0,
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundCard,
    marginRight: 8,
  },
  filterTabActive: {
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  filterTabTextActive: {
    color: Colors.textPrimary,
  },
  listContent: {
    flexGrow: 1,
  },
  categoriesSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundCard,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
});
