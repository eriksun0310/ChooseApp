import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const YesScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>填入你想吃的！</Text>
      </View>

      <Button
        text="GO!"
        color="#FFCD4B"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default YesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5E8",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 1,
    marginTop: 80,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 16,
  },

  footer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 100,
    alignItems: "center",
  },
});
