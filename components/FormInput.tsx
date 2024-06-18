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
  deleteInput: (v: string) => void;
  setShowGo: React.Dispatch<React.SetStateAction<boolean>>;
  isNew: boolean;
}

const FormInput: FC<FormInputProps> = ({
  id,
  isNew,
  deleteInput,
  setShowGo,
}) => {
  const fadeAnim = useRef(new Animated.Value(isNew ? 0 : 1)).current;

  const handleFocus = () => {
    setShowGo(false);
  };

  const handleBlur = () => {
    setShowGo(true);
  };

  const handleDelete = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => deleteInput(id));
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

  useEffect(() => {
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
    };
  }, []);
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TextInput
        key={id}
        style={styles.input}
        placeholder="請輸入"
        onFocus={handleFocus}
        onBlur={handleBlur}
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
