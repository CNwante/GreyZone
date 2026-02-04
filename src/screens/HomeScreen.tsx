import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootTabParamList } from "../types";
import { Colors } from "../constants/colors";
import Header from "../components/Header";
import { mockHomeData } from "../data/mockHomeData";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootTabParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleNotificationPress = () => {
    navigation.navigate("Notifications");
  };

  const handleSettingsPress = () => {
    // TODO: navigate to settings in future
    console.log("Settings pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        user={mockHomeData.user}
        onNotificationPress={handleNotificationPress}
        onSettingsPress={handleSettingsPress}
      />

      <ScrollView style={styles.content}>
        <View style={styles.placeholder}>
          <Text style={styles.title}>Home Screen</Text>
          <Text style={styles.subtitle}>Components will be added soon</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  placeholder: {
    padding: 20,
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
