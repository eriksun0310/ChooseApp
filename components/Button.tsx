import { FC } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

interface ButtonProps {
  text: string;
  color: string;
  onPress: () => void;
}
const Button: FC<ButtonProps> = ({ text, color, onPress }) => {
  return (
    <View style={[styles.button, { backgroundColor: color }]}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
const styles = StyleSheet.create({
  button: {
    minWidth: 120, // 设置按钮的最小宽度
    minHeight: 50, // 设置按钮的最小高度
    paddingVertical: 10, // 垂直方向的内边距
    paddingHorizontal: 20, // 水平方向的内边距
    marginHorizontal: 12,
    borderRadius: 8, // 按钮的圆角
    fontSize: 34,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 24,
  },
});
