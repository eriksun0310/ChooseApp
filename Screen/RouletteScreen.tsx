import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Roulette from "../components/Roulette";

const RouletteScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>交給命運來做決定吧！</Text>
      </View>
      <View style={styles.content}>
        <Roulette />
      </View>

      <View style={styles.footer}></View>
    </View>
  );
};

export default RouletteScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5E8",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    // flex: 1,
    marginTop: 80,
    marginBottom: 30,
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

  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
