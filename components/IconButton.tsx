import AntDesign from "@expo/vector-icons/AntDesign";
import React, { FC } from "react";
import { View, Pressable, } from "react-native";
interface IconButtonProps {
  onPress: () => void;
  icon?: "pluscircleo" | "close";
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const IconButton: FC<IconButtonProps> = ({
  onPress,
  icon = "pluscircleo",
  size = 100,
  color = "#659df1cf",
  backgroundColor,
}) => {
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 50,
          padding: 5,
        }}
        onPress={onPress}
      >
        <AntDesign  name={icon} size={size} color={color} />
      </Pressable>
    </View>
  );
};

export default IconButton;

