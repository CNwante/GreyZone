import React from "react";
import { View, FlatList, StyleSheet, ListRenderItem } from "react-native";
import { Holding } from "../types";
import { Colors } from "../constants/colors";
import SectionHeader from "./SectionHeader";
import HoldingRow from "./HoldingRow";

interface HoldingsListProps {
  holdings: Holding[];
  onSeeAllPress: () => void;
  onHoldingPress: (holding: Holding) => void;
  maxItems?: number;
}

export default function HoldingsList({
  holdings,
  onSeeAllPress,
  onHoldingPress,
  maxItems = 3,
}: HoldingsListProps) {
  const displayedHoldings = holdings.slice(0, maxItems);

  const renderItem: ListRenderItem<Holding> = ({ item, index }) => {
    const isLastItem = index === displayedHoldings.length - 1;
    return (
      <HoldingRow
        holding={item}
        onPress={onHoldingPress}
        showSeparator={!isLastItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title="Your Holdings"
        onSeeAllPress={onSeeAllPress}
        showSeeAll={holdings.length > maxItems}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={displayedHoldings}
          renderItem={renderItem}
          keyExtractor={(item) => item.coinId}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  listContainer: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
