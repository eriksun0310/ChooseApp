import AntDesign from "@expo/vector-icons/AntDesign";
import React, { FC } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
interface IconButtonProps {
  onPress: () => void;
  size?: number;
  color?: string;
}

const IconButton: FC<IconButtonProps> = ({
  onPress,
  size = 100,
  color = "#659df1cf",
}) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <AntDesign name="pluscircleo" size={size} color={color} />
      </Pressable>
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 24,
  },
});
