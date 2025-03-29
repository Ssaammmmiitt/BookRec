import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../../store/authStore";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {user,isLoading,register} = useAuthStore();


  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const result = await register(username,email,password);
    if(!result.success){
      Alert.alert("Error",result.error);
    }
    };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.title}>BookRec📚</Text>
            <Text style={styles.subtitle}>Recommend some books</Text>
          </View>

          {/* FORM */}
          <View style={styles.formContainer}>
            {/*UsernameInput */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person-outline"
                  style={styles.inputIcon}
                  size={20}
                  color={COLORS.primary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter an username"
                  value={username}
                  onChangeText={setUsername}
                  placeholderTextColor={COLORS.placeholderText}
                  keyboardType="default"
                  autoCapitalize="none"
                  keyboardAppearance="default"
                />
              </View>
            </View>

            {/* EmailInput */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail"
                  style={styles.inputIcon}
                  size={20}
                  color={COLORS.primary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter an email"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={COLORS.placeholderText}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  keyboardAppearance="default"
                  />
              </View>
            </View>

            {/* PasswordInput */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  style={styles.inputIcon}
                  size={20}
                  color={COLORS.primary}
                />
                <TextInput
                  style={styles.input}
                  placeholder="*********"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Signup Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
