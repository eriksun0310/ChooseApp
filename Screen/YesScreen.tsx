import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Form from "../components/Form";

const YesScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>填入你想吃的！</Text>
      </View>
      <Form />
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
    // flex: 1,
    marginTop: 80,
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
  },
});
