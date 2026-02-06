import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { mockUserProfile } from "../data/mockUserData";

export default function EditProfileScreen() {
  const navigation = useNavigation();

  // Local state for form fields
  const [firstName, setFirstName] = useState(mockUserProfile.firstName);
  const [lastName, setLastName] = useState(mockUserProfile.lastName);
  const [username, setUsername] = useState(mockUserProfile.username);
  const [email, setEmail] = useState(mockUserProfile.email);
  const [bio, setBio] = useState(mockUserProfile.bio || "");
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    // TODO: API call to save profile
    Alert.alert(
      "Profile Updated",
      "Your profile has been updated successfully!",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure you want to discard them?",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleChangeAvatar = () => {
    // TODO: Open image picker
    Alert.alert("Change Avatar", "Image picker would open here", [
      { text: "OK" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleCancel} style={styles.headerButton}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <Pressable onPress={handleSave} style={styles.headerButton}>
          <Text style={styles.saveButton}>Save</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </Text>
            </View>
            <Pressable
              style={styles.avatarEditButton}
              onPress={handleChangeAvatar}
            >
              <Ionicons name="camera" size={16} color={Colors.textPrimary} />
            </Pressable>
          </View>
          <Pressable onPress={handleChangeAvatar}>
            <Text style={styles.changeAvatarText}>Change Photo</Text>
          </Pressable>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* First Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setHasChanges(true);
              }}
              placeholder="Enter first name"
              placeholderTextColor={Colors.textTertiary}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                setHasChanges(true);
              }}
              placeholder="Enter last name"
              placeholderTextColor={Colors.textTertiary}
            />
          </View>

          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setHasChanges(true);
              }}
              placeholder="Enter username"
              placeholderTextColor={Colors.textTertiary}
              autoCapitalize="none"
            />
            <Text style={styles.helperText}>
              Your unique username for the community
            </Text>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setHasChanges(true);
              }}
              placeholder="Enter email"
              placeholderTextColor={Colors.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Bio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={bio}
              onChangeText={(text) => {
                setBio(text);
                setHasChanges(true);
              }}
              placeholder="Tell us about yourself..."
              placeholderTextColor={Colors.textTertiary}
              multiline
              numberOfLines={4}
              maxLength={160}
            />
            <Text style={styles.helperText}>{bio.length}/160 characters</Text>
          </View>

          {/* Membership Info */}
          <View style={styles.membershipCard}>
            <View style={styles.membershipHeader}>
              <Ionicons name="star" size={20} color={Colors.primary} />
              <Text style={styles.membershipTitle}>Premium Member</Text>
            </View>
            <Text style={styles.membershipText}>
              Member since{" "}
              {new Date(mockUserProfile.memberSince).toLocaleDateString()}
            </Text>
            <Pressable style={styles.manageButton}>
              <Text style={styles.manageButtonText}>Manage Subscription</Text>
            </Pressable>
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
  headerButton: {
    padding: 4,
    minWidth: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "right",
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  avatarEditButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundCard,
    borderWidth: 2,
    borderColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  changeAvatarText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  formSection: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  helperText: {
    fontSize: 12,
    color: Colors.textTertiary,
    marginTop: 6,
  },
  membershipCard: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 8,
  },
  membershipHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  membershipText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  manageButton: {
    backgroundColor: Colors.primary + "20",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  manageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  bottomSpacer: {
    height: 32,
  },
});
