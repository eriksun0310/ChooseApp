import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  Animated,
  LayoutAnimation,
  Alert,
} from "react-native";
import IconButton from "./IconButton";
import FormInput from "./FormInput";
import { v4 as uuidV4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";
interface Input {
  id: string;
  value: string;
  isNew: boolean;
  hasError: boolean;
}

const initialInput = {
  id: uuidV4(),
  value: "",
  isNew: false,
  hasError: false,
};

const Form = () => {
  const navigation = useNavigation();
  // 所有input 資料
  const [inputs, setInputs] = useState<Input[]>([initialInput]);

  //是否顯示form
  const [showForm, setShowForm] = useState(true);

  //是否顯示Go Btn
  const [showGo, setShowGo] = useState(false);

  //檢查是否有 任何的input 未填寫的
  const isCheckEmptyInput = inputs.some(
    (item) => item.hasError || item.value.trim() === ""
  );

  const fadeAnim = useRef(new Animated.Value(showForm ? 0 : 1)).current;

  //關閉form
  const onClose = () => {
    //配置下一次布局變化的動畫效果
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //執行淡出動畫
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowForm(false);
      //清空input 資料
      setInputs([initialInput]);
    });
  };

  // 增加input
  const addInput = () => {
    //檢查現有的輸入框是否有未填寫的
    let hasEmptyInput = false;
    setInputs((prevInputs) => {
      return prevInputs?.map((input) => {
        if (input.value.trim() === "") {
          hasEmptyInput = true;
          return { ...input, hasError: true };
        }
        return { ...input, hasError: false };
      });
    });

    // 如果有未填寫的input , 阻止新增操作
    if (hasEmptyInput) {
      Alert.alert("請填寫所有輸入框後再填加新的輸入框");
      return;
    }
    // 新增輸入框
    const newID = uuidV4();
    setInputs((prev) => [
      ...prev,
      { id: newID, value: "", isNew: true, hasError: false },
    ]);
  };

  // 刪除input
  const deleteInput = (id: string) => {
    setInputs(inputs?.filter((item) => item.id !== id));
  };

  //更新input 值
  const updateInputValue = (id: string, value: string) => {
    setInputs(
      inputs.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value,
            hasError: value.trim() === "" && item.hasError,
          };
        }
        return item;
      })
    );
  };

  //render 每個input
  const renderInputItem = ({ item }: ListRenderItemInfo<Input>) => (
    <FormInput
      {...item}
      updateInputValue={updateInputValue}
      deleteInput={deleteInput}
    />
  );

  //處理 如果沒有form, Go 按鈕則不出現
  useEffect(() => {
    if (showForm) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setShowGo(true));
    } else {
      setShowGo(false);
    }
  }, [showForm]);
  return (
    <>
      <View style={styles.content}>
        {showForm ? (
          <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
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
          </Animated.View>
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
            onPress={() => {
              if (isCheckEmptyInput) {
                Alert.alert("請填寫所有輸入框後再按下Go!");
              } else {
                navigation.navigate("Roulette");
              }
            }}
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
    flex: 1,
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
