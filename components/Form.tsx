import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ListRenderItemInfo } from "react-native";
import IconButton from "./IconButton";
import FormInput from "./FormInput";
import { v4 as uuidV4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
interface Inputs {
  id: string;
}

interface InputItem {
  id: string;
}
const Form = () => {
  const navigation = useNavigation();
  // 所有input 資料
  const [inputs, setInputs] = useState<Inputs[]>([{ id: uuidV4() }]);
  //是否顯示form
  const [showForm, setShowForm] = useState(false);

  //是否顯示Go Btn
  const [showGo, setShowGo] = useState(false);

  const [isNew, setIsNew] = useState(false);

  //關閉form
  const onClose = () => {
    setShowForm(false);
  };

  // 增加input
  const addInput = () => {
    const newID = uuidV4();
    setIsNew(true);
    setInputs((prev) => [...prev, { id: newID }]);
  };

  // 刪除input
  const deleteInput = (id: string) => {
    setInputs(inputs?.filter((item) => item.id !== id));
  };

  //render 每個input
  const renderInputItem = ({ item }: ListRenderItemInfo<InputItem>) => (
    <FormInput
      {...item}
      deleteInput={deleteInput}
      setShowGo={setShowGo}
      isNew={isNew}
    />
  );

  //處理 如果沒有form, Go 按鈕則不出現
  useEffect(() => {
    if (showForm) {
      setShowGo(true);
    } else {
      setShowGo(false);
    }
  }, [showForm]);
  return (
    <>
      <View style={styles.content}>
        {showForm ? (
          <View style={styles.form}>
            <View style={styles.closeBtnContainer}>
              <IconButton
                onPress={onClose}
                icon="close"
                size={35}
                color="#ffffff"
                backgroundColor="#F77676"
              />
            </View>

            <FlatList
              data={inputs}
              renderItem={renderInputItem}
              keyExtractor={(item) => item.id}
            />

            <View style={styles.plusBtnContainer}>
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
        {showGo && (
          <Button
            text="GO!"
            color="#B5EEA7"
            onPress={() => navigation.navigate("Roulette")}
          />
        )}
      </View>
    </>
  );
};

export default Form;
const styles = StyleSheet.create({
  

 
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
    position: "relative",
    padding: 10,
    backgroundColor: "#D6F5FF",
    paddingHorizontal: 1,
    paddingTop: 24,
    width: 350,
    height: 600,
  },
  closeBtnContainer: {
    position: "absolute",
    top: -28,
    right: -25,
    borderRadius: 6,
  },

  plusBtnContainer: {
    display: "flex",
    alignItems: "center",
    paddingTop: 10,
  },

  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
