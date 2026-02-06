import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import ProfileCard from "../components/ProfileCard";
import SettingsSection from "../components/SettingsSection";
import SettingsRow from "../components/SettingsRow";
import {
  mockUserProfile,
  mockUserSettings,
  appVersion,
} from "../data/mockUserData";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../navigation/SettingsStack";

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  "SettingsMain"
>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

export default function SettingsScreen({ navigation }: Props) {
  const [currency, setCurrency] = useState(mockUserSettings.currency);
  const [language, setLanguage] = useState(mockUserSettings.language);

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          console.log("Sign out and navigate to ONBOARD-002");
          // TODO: Clear auth and navigate to onboarding
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <ProfileCard
          firstName={mockUserProfile.firstName}
          lastName={mockUserProfile.lastName}
          username={mockUserProfile.username}
          isPremium={mockUserProfile.isPremium}
          onPress={() => navigation.navigate("EditProfile")}
        />

        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsRow
            icon="person-outline"
            label="Edit Profile"
            onPress={() => navigation.navigate("EditProfile")}
          />
          <SettingsRow
            icon="lock-closed-outline"
            label="Security"
            onPress={() => navigation.navigate("SecuritySettings")}
          />
          <SettingsRow
            icon="star-outline"
            label="Subscription"
            value={mockUserProfile.isPremium ? "Premium" : "Free"}
            onPress={() => console.log("Navigate to SET-005 (Subscription)")}
          />
          <SettingsRow
            icon="wallet-outline"
            label="Connected Accounts"
            onPress={() =>
              console.log("Navigate to WALLET-001 (Connected Wallets)")
            }
          />
        </SettingsSection>

        {/* Preferences Section */}
        <SettingsSection title="Preferences">
          <SettingsRow
            icon="notifications-outline"
            label="Notifications"
            onPress={() => navigation.navigate("NotificationSettings")}
          />
          <SettingsRow
            icon="color-palette-outline"
            label="Appearance"
            value="Dark"
            onPress={() => console.log("Navigate to SET-006 (Appearance)")}
          />
          <SettingsRow
            icon="cash-outline"
            label="Currency"
            value={currency}
            onPress={() => console.log("Navigate to Currency")}
          />
          <SettingsRow
            icon="language-outline"
            label="Language"
            value="English"
            onPress={() => console.log("Navigate to Language")}
          />
        </SettingsSection>

        {/* Learn & Community Section */}
        <SettingsSection title="Learn & Community">
          <SettingsRow
            icon="school-outline"
            label="Learn Hub"
            onPress={() => console.log("Navigate to LEARN-001 (Learn Hub)")}
          />
          <SettingsRow
            icon="trophy-outline"
            label="Achievements"
            onPress={() => console.log("Navigate to LEARN-005 (Achievements)")}
          />
          <SettingsRow
            icon="trending-up-outline"
            label="Paper Trading"
            onPress={() => console.log("Navigate to LEARN-011 (Paper Trading)")}
          />
          <SettingsRow
            icon="chatbubbles-outline"
            label="Social Feed"
            onPress={() => console.log("Navigate to NEWS-004 (Social Feed)")}
          />
        </SettingsSection>

        {/* Support Section */}
        <SettingsSection title="Support">
          <SettingsRow
            icon="help-circle-outline"
            label="Help Center"
            onPress={() => console.log("Navigate to SET-011 (Help Center)")}
          />
          <SettingsRow
            icon="mail-outline"
            label="Contact Support"
            onPress={() => console.log("Navigate to SET-012 (Contact Support)")}
          />
          <SettingsRow
            icon="star-half-outline"
            label="Rate App"
            onPress={() => {
              Alert.alert(
                "Rate GreyZone",
                "Thank you for using GreyZone! Would you like to rate us?",
                [
                  { text: "Not Now", style: "cancel" },
                  {
                    text: "Rate App",
                    onPress: () => console.log("Open App Store"),
                  },
                ]
              );
            }}
          />
        </SettingsSection>

        {/* Legal Section */}
        <SettingsSection title="Legal">
          <SettingsRow
            icon="document-text-outline"
            label="Terms of Service"
            onPress={() =>
              console.log("Navigate to LEGAL-001 (Terms of Service)")
            }
          />
          <SettingsRow
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            onPress={() =>
              console.log("Navigate to LEGAL-002 (Privacy Policy)")
            }
          />
        </SettingsSection>

        {/* Sign Out Button */}
        <Pressable
          onPress={handleSignOut}
          style={({ pressed }) => [
            styles.signOutButton,
            pressed && styles.signOutButtonPressed,
          ]}
        >
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>

        {/* Version Footer */}
        <Text style={styles.versionText}>
          Version {appVersion.version} (Build {appVersion.buildNumber})
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.error + "15",
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 24,
  },
  signOutButtonPressed: {
    opacity: 0.7,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.error,
  },
  versionText: {
    fontSize: 12,
    color: Colors.textTertiary,
    textAlign: "center",
    marginBottom: 16,
  },
});
