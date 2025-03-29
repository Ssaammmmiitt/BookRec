import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/profile.styles";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";

export default function profile() {

  const {token} =useAuthStore();


  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`http://10.0.2.2:3002/api/books/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.message || "Something went wrong fetching profile"
        );

      setBooks(data);
    } catch (error) {
      console.error("Error fetching books", error);
      Alert.alert("Error", error.message || "Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=> {
    fetchData();
  },[]);


  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
    </View>
  );
}
