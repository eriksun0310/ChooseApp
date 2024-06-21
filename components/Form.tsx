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
import { useDispatch, useSelector } from "react-redux";
import { addInput, clearInputs, updateInput } from "../store/wheelSlice";
import { RootState } from "../store/store";
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

  const dispatch = useDispatch();
  const flatListRef = useRef<FlatList<Input>>(null);// 創建 FlatList 的引用 
  const inputs = useSelector((state: RootState) => state.wheel.inputs);

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
      //清空inputs 資料
      dispatch(clearInputs());
    });
  };

  // 增加input
  const addInputHandle = () => {
    //檢查現有的輸入框是否有未填寫的
    let hasEmptyInput = false;

    inputs.forEach((input) => {
      console.log("input", input);
      if (input.value.trim() === "") {
        hasEmptyInput = true;
        dispatch(
          updateInput({
            id: input.id,
            value: input.value,
            hasError: true,
          })
        );
      } else {
        dispatch(
          updateInput({
            id: input.id,
            value: input.value,
            hasError: false,
          })
        );
      }
    });

    // 如果有未填寫的input , 阻止新增操作
    if (hasEmptyInput) {
      Alert.alert("請填寫所有輸入框後再填加新的輸入框");
      return;
    }
    // 新增輸入框
    const newID = uuidV4();
    const newInput = { id: newID, value: "", isNew: true, hasError: false };
    dispatch(addInput(newInput));

    //等待 新增input 完成後滾動到底部
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  //render 每個input
  const renderInputItem = ({ item }: ListRenderItemInfo<Input>) => (
    <FormInput {...item} />
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
              ref={flatListRef}
              data={inputs}
              renderItem={renderInputItem}
              keyExtractor={(item) => item.id}
            />

            {/* 新增input */}
            <View style={styles.plusBtnContainer}>
              <IconButton onPress={addInputHandle} size={50} />
            </View>
          </Animated.View>
        ) : (
          <IconButton onPress={() => setShowForm(true)} />
        )}
      </View>
      <View style={styles.footer}>
        {/* Go 按鈕 */}
        {showGo && (
          <Button
            text="GO!"
            color="#B5EEA7"
            onPress={() => {
              if (inputs.length > 1) {
                if (isCheckEmptyInput) {
                  Alert.alert("請填寫所有輸入框後再按下Go!");
                } else {
                  navigation.navigate("Roulette");
                }
              } else {
                Alert.alert("選項不能小於2");
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
    flex: 2,
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
    marginTop: 80,
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
