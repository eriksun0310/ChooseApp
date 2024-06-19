import { FC, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
interface FormInputProps {
  id: string;
  isNew: boolean;
  hasError: boolean;
  value: string;
  updateInputValue: (id: string, value: string) => void;
  deleteInput: (v: string) => void;
}

const FormInput: FC<FormInputProps> = ({
  id,
  isNew,
  hasError,
  value,
  deleteInput,
  updateInputValue,
}) => {
  const fadeAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;

  const handleDelete = () => {
    //配置下一次布局變化的動畫效果
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //執行淡出動畫
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => deleteInput(id)); // 動畫結束後刪除輸入框
  };

  useEffect(() => {
    if (isNew) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isNew]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TextInput
        key={id}
        style={[styles.input, hasError && { borderColor: "red" }]}
        placeholder="請輸入"
        value={value}
        onChangeText={(text) => updateInputValue(id, text)}
      />
      <FontAwesome
        name="trash-o"
        size={35}
        color="#f65757"
        onPress={handleDelete}
      />
    </Animated.View>
  );
};
export default FormInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 12,
  },
  input: {
    flex: 1,
    height: 40,
    marginHorizontal: 6,
    borderWidth: 1,
    padding: 10,
    borderColor: "#E9E9E9",
    backgroundColor: "#E9E9E9",
  },
});
