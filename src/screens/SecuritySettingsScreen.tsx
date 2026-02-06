import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { mockUserSettings } from "../data/mockUserData";
import SettingsRow from "../components/SettingsRow";

export default function SecuritySettingsScreen() {
  const navigation = useNavigation();

  // Local state for security settings
  const [biometricEnabled, setBiometricEnabled] = useState(
    mockUserSettings.security.biometricEnabled
  );
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    mockUserSettings.security.twoFactorEnabled
  );

  const handleBiometricToggle = (value: boolean) => {
    setBiometricEnabled(value);
    // TODO: API call to update setting
    Alert.alert(
      value ? "Biometric Enabled" : "Biometric Disabled",
      value
        ? "You can now use Face ID/Touch ID to unlock the app"
        : "Biometric authentication has been disabled"
    );
  };

  const handleTwoFactorToggle = (value: boolean) => {
    if (value) {
      // Show setup flow
      Alert.alert(
        "Enable 2FA",
        "You'll need to set up an authenticator app to enable two-factor authentication.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Continue",
            onPress: () => {
              // TODO: Navigate to 2FA setup flow
              Alert.alert("2FA Setup", "2FA setup flow would start here");
            },
          },
        ]
      );
    } else {
      // Show disable confirmation
      Alert.alert(
        "Disable 2FA",
        "Are you sure you want to disable two-factor authentication? This will make your account less secure.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Disable",
            style: "destructive",
            onPress: () => {
              setTwoFactorEnabled(false);
              Alert.alert(
                "2FA Disabled",
                "Two-factor authentication has been disabled"
              );
            },
          },
        ]
      );
    }
  };

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen
    Alert.alert("Change Password", "Change password flow would open here");
  };

  const handleViewSessions = () => {
    // TODO: Navigate to active sessions screen
    Alert.alert("Active Sessions", "Active sessions list would open here");
  };

  const handleViewBackupCodes = () => {
    // TODO: Navigate to backup codes screen
    Alert.alert("Backup Codes", "Backup codes screen would open here");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Authentication Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AUTHENTICATION</Text>

          {/* Biometric Authentication */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.primary + "20" },
                ]}
              >
                <Ionicons
                  name="finger-print"
                  size={20}
                  color={Colors.primary}
                />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Biometric Login</Text>
                <Text style={styles.settingDescription}>
                  Use Face ID or Touch ID to unlock
                </Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: Colors.border, true: Colors.primary + "80" }}
              thumbColor={
                biometricEnabled ? Colors.primary : Colors.textTertiary
              }
            />
          </View>

          {/* Two-Factor Authentication */}
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: Colors.success + "20" },
                ]}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={20}
                  color={Colors.success}
                />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  Two-Factor Authentication
                </Text>
                <Text style={styles.settingDescription}>
                  {twoFactorEnabled
                    ? "Enabled"
                    : "Add an extra layer of security"}
                </Text>
              </View>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={handleTwoFactorToggle}
              trackColor={{ false: Colors.border, true: Colors.success + "80" }}
              thumbColor={
                twoFactorEnabled ? Colors.success : Colors.textTertiary
              }
            />
          </View>

          {/* Backup Codes (only show if 2FA enabled) */}
          {twoFactorEnabled && (
            <SettingsRow
              icon="key"
              label="Backup Codes"
              value=""
              onPress={handleViewBackupCodes}
              iconColor={Colors.warning}
            />
          )}
        </View>

        {/* Password & Recovery Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PASSWORD & RECOVERY</Text>

          <SettingsRow
            icon="lock-closed"
            label="Change Password"
            value=""
            onPress={handleChangePassword}
            iconColor={Colors.primary}
          />
        </View>

        {/* Session Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SESSION MANAGEMENT</Text>

          <SettingsRow
            icon="phone-portrait"
            label="Active Sessions"
            value="3 devices"
            onPress={handleViewSessions}
            iconColor={Colors.primary}
          />
        </View>

        {/* Security Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons
              name="information-circle"
              size={24}
              color={Colors.primary}
            />
            <Text style={styles.tipsTitle}>Security Tips</Text>
          </View>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>
              • Enable two-factor authentication for maximum security
            </Text>
            <Text style={styles.tipItem}>• Use a strong, unique password</Text>
            <Text style={styles.tipItem}>
              • Never share your password or backup codes
            </Text>
            <Text style={styles.tipItem}>
              • Review active sessions regularly
            </Text>
            <Text style={styles.tipItem}>
              • Enable biometric login for quick access
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacer} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textTertiary,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  tipsCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 32,
  },
});
