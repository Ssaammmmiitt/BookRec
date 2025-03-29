import { View, Text } from "react-native";
import React from "react";
import { formatMemberSince } from "../lib/utils";
import avatar from 'animal-avatar-generator'
import {SvgXml} from "react-native-svg";
import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.styles";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  const svg = avatar(`${user?.username}`, { size:80 , backgroundColors:["#000000"]});

  if(!user) return null; // Handle the case when user is not available

  return (
    <View style={styles.profileHeader}>
      {/* <Image source={{ uri: user?.profilePic }} style={styles.profileImage} /> */}
      <SvgXml xml={svg} style={styles.profileImage}/>

       <View style={styles.profileInfo}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.memberSince}>
          Joined {formatMemberSince(user?.createdAt)}
        </Text>
      </View> 
    </View>
  );
}
