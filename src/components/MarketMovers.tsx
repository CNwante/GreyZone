import React from "react";
import { View, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { MarketMover } from "../types";
import SectionHeader from "./SectionHeader";
import MarketMoverCard from "./MarketMoverCard";

interface MarketMoversProps {
  movers: MarketMover[];
  onSeeAllPress: () => void;
  onMoverPress?: (mover: MarketMover) => void;
}

export default function MarketMovers({
  movers,
  onSeeAllPress,
  onMoverPress,
}: MarketMoversProps) {
  const renderItem: ListRenderItem<MarketMover> = ({ item }) => {
    return <MarketMoverCard mover={item} onPress={onMoverPress} />;
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Market Movers"
        onSeeAllPress={onSeeAllPress}
        showSeeAll={true}
      />

      <FlatList
        data={movers}
        renderItem={renderItem}
        keyExtractor={(item) => item.coinId}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
