import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {useAuthStore} from "../store/authStore";
import { useEffect } from "react";

export default function Index() {

  const {user,token, checkAuth,logout}= useAuthStore();
  console.log(user, token);

  useEffect(()=>{
    checkAuth();
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {user?.username}</Text>
      <Text style={styles.title}>Token : {token}</Text>
      <Link href="/(auth)/signup">Signup</Link>
      <Link href="/(auth)">Login</Link>

      <TouchableOpacity  onPress={()=>{logout()}}>
        <Text style={{borderColor:"#fff",fontWeight:800,fontSize:23,color:"green"}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image1: {
    width: 300,
    height: 500,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "red",
  },
});
