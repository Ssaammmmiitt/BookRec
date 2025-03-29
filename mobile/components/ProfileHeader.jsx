import { View, Text } from "react-native";
import React from "react";
import { formatMemberSince } from "../lib/utils";

import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.styles";
import { Image } from "expo-image";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  return (
    <View style={styles.profileHeader}>
      {console.log(user?.profilePic)}
      <Image source={{ uri: user?.profilePic }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.memberSince}>
          {" "}
          Joined {formatMemberSince(user.createdAt)}
        </Text>
      </View>
    </View>
  );
}
