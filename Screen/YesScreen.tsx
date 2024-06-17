import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import IconButton from "../components/IconButton";
import { Input } from "react-native-elements";
import { v4 as uuidV4 } from "uuid";
import FormInput from "../components/FormInput";

interface Inputs {
  id: string;
}

interface InputItem {
  id: string;
//   value: string;
}

const YesScreen = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState<Inputs[]>([{ id: uuidV4() }]);

  const [showForm, setShowForm] = useState(false);

  const addInput = () => {
    const newID = uuidV4();
    setInputs((prev) => [...prev, { id: newID }]);
  };

  const deleteInput = (id: string) => {
    setInputs(inputs?.filter((item) => item.id !== id));
  };

  const renderInputItem = ({item}: ListRenderItemInfo<InputItem>) => (
    <FormInput {...item} deleteInput={deleteInput} />
  );
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>填入你想吃的！</Text>
      </View>

      <View style={styles.content}>
        {showForm ? (
          <View style={styles.form}>
            <FlatList
              data={inputs}
              renderItem={renderInputItem}
              keyExtractor={(item) => item.id}
            />

            <View style={styles.plusBtn}>
              {/* 按下加的時候 也要擋上一個有沒有填 */}
              <IconButton onPress={addInput} size={50} />
            </View>
          </View>
        ) : (
          <IconButton onPress={() => setShowForm(true)} />
        )}
      </View>

      <View style={styles.footer}>
        {/* 按下go 的時候要擋 看input 的資料有沒有填 */}
        <Button
          text="GO!"
          color="#B5EEA7"
          onPress={() => navigation.navigate("Roulette")}
        />
      </View>
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

  form: {
    padding: 10,
    backgroundColor: "#D6F5FF",
    paddingHorizontal: 24,
    paddingTop: 24,
    width: 350,
    height: 600,
  },

  plusBtn: {
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
  },

  footer: {
    flex: 1,
    flexDirection: "row",
    // marginBottom: 100,
    alignItems: "center",
  },
});
