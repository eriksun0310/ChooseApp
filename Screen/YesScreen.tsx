import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Form from "../components/Form";

const YesScreen = () => {
  //處理點擊input外 關閉鍵盤
  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableNativeFeedback onPress={handlePressOutside}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.title}>填入所有你選擇障礙的！</Text>
        </View>
        <Form />
      </View>
    </TouchableNativeFeedback>
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
