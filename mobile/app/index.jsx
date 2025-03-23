import { StyleSheet, Text, View } from "react-native";
import {Image} from "expo-image";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Image style={styles.image1} source={{uri:"https://plus.unsplash.com/premium_photo-1732017765181-3b0f972778a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"}}/>
      <Text style={styles.title
      }>Hello Welcome to My Mobile App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  image1:{
    width:300,
    height:500,
  },
  title:{
    fontSize:12,
    fontWeight:"bold",
    color:"red",
  }
})