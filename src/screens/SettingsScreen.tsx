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
import { mockUserProfile, mockUserSettings, appVersion } from "../data/mockUserData";

export default function SettingsScreen({ navigation }: any) {
  const [currency, setCurrency] = useState(mockUserSettings.currency);
  const [language, setLanguage] = useState(mockUserSettings.language);

  const handleEditProfile = () => {
    console.log("Navigate to SET-002 (Edit Profile)");
    // TODO: Navigate to SET-002
  };

  const handleSecurity = () => {
    console.log("Navigate to SET-003 (Security)");
    // TODO: Navigate to SET-003
  };

  const handleSubscription = () => {
    console.log("Navigate to SET-005 (Subscription)");
    // TODO: Navigate to SET-005
  };

  const handleConnectedAccounts = () => {
    console.log("Navigate to WALLET-001 (Connected Wallets)");
    // TODO: Navigate to WALLET-001
  };

  const handleNotifications = () => {
    console.log("Navigate to SET-004 (Notifications)");
    // TODO: Navigate to SET-004
  };

  const handleAppearance = () => {
    console.log("Navigate to SET-006 (Appearance)");
    // TODO: Navigate to SET-006
  };

  const handleCurrencySelect = () => {
    Alert.alert(
      "Select Currency",
      "Currency selection coming soon",
      [{ text: "OK" }]
    );
  };

  const handleLanguageSelect = () => {
    Alert.alert(
      "Select Language",
      "Language selection coming soon",
      [{ text: "OK" }]
    );
  };

  const handleLearnHub = () => {
    console.log("Navigate to LEARN-001 (Learn Hub)");
    // TODO: Navigate to LEARN-001
  };

  const handleAchievements = () => {
    console.log("Navigate to LEARN-005 (Achievements)");
    // TODO: Navigate to LEARN-005
  };

  const handlePaperTrading = () => {
    console.log("Navigate to LEARN-011 (Paper Trading)");
    // TODO: Navigate to LEARN-011
  };

  const handleSocialFeed = () => {
    console.log("Navigate to NEWS-004 (Social Feed)");
    // TODO: Navigate to NEWS-004
  };

  const handleHelpCenter = () => {
    console.log("Navigate to SET-011 (Help Center)");
    // TODO: Navigate to SET-011
  };

  const handleContactSupport = () => {
    console.log("Navigate to SET-012 (Contact Support)");
    // TODO: Navigate to SET-012
  };

  const handleRateApp = () => {
    Alert.alert(
      "Rate GreyZone",
      "Thank you for using GreyZone! Would you like to rate us?",
      [
        { text: "Not Now", style: "cancel" },
        { text: "Rate App", onPress: () => console.log("Open App Store") },
      ]
    );
  };

  const handleTermsOfService = () => {
    console.log("Navigate to LEGAL-001 (Terms of Service)");
    // TODO: Navigate to LEGAL-001
  };

  const handlePrivacyPolicy = () => {
    console.log("Navigate to LEGAL-002 (Privacy Policy)");
    // TODO: Navigate to LEGAL-002
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            console.log("Sign out and navigate to ONBOARD-002");
            // TODO: Clear auth and navigate to onboarding
          },
        },
      ]
    );
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
          onPress={handleEditProfile}
        />

        {/* Account Section */}
        <SettingsSection title="Account">
          <SettingsRow
            icon="person-outline"
            label="Edit Profile"
            onPress={handleEditProfile}
          />
          <SettingsRow
            icon="lock-closed-outline"
            label="Security"
            onPress={handleSecurity}
          />
          <SettingsRow
            icon="star-outline"
            label="Subscription"
            value={mockUserProfile.isPremium ? "Premium" : "Free"}
            onPress={handleSubscription}
          />
          <SettingsRow
            icon="wallet-outline"
            label="Connected Accounts"
            onPress={handleConnectedAccounts}
          />
        </SettingsSection>

        {/* Preferences Section */}
        <SettingsSection title="Preferences">
          <SettingsRow
            icon="notifications-outline"
            label="Notifications"
            onPress={handleNotifications}
          />
          <SettingsRow
            icon="color-palette-outline"
            label="Appearance"
            value="Dark"
            onPress={handleAppearance}
          />
          <SettingsRow
            icon="cash-outline"
            label="Currency"
            value={currency}
            onPress={handleCurrencySelect}
          />
          <SettingsRow
            icon="language-outline"
            label="Language"
            value="English"
            onPress={handleLanguageSelect}
          />
        </SettingsSection>

        {/* Learn & Community Section */}
        <SettingsSection title="Learn & Community">
          <SettingsRow
            icon="school-outline"
            label="Learn Hub"
            onPress={handleLearnHub}
          />
          <SettingsRow
            icon="trophy-outline"
            label="Achievements"
            onPress={handleAchievements}
          />
          <SettingsRow
            icon="trending-up-outline"
            label="Paper Trading"
            onPress={handlePaperTrading}
          />
          <SettingsRow
            icon="chatbubbles-outline"
            label="Social Feed"
            onPress={handleSocialFeed}
          />
        </SettingsSection>

        {/* Support Section */}
        <SettingsSection title="Support">
          <SettingsRow
            icon="help-circle-outline"
            label="Help Center"
            onPress={handleHelpCenter}
          />
          <SettingsRow
            icon="mail-outline"
            label="Contact Support"
            onPress={handleContactSupport}
          />
          <SettingsRow
            icon="star-half-outline"
            label="Rate App"
            onPress={handleRateApp}
          />
        </SettingsSection>

        {/* Legal Section */}
        <SettingsSection title="Legal">
          <SettingsRow
            icon="document-text-outline"
            label="Terms of Service"
            onPress={handleTermsOfService}
          />
          <SettingsRow
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            onPress={handlePrivacyPolicy}
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
