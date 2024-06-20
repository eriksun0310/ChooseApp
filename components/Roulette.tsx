import React, { useState, useRef, FC } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text as RNText,
} from "react-native";
import Svg, { Circle, G, Text, Path, Polygon } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

import { Dialog } from "@rneui/themed";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { clearInputs } from "../store/wheelSlice";

const Roulette: FC = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const inputs = useSelector((state: RootState) => state.wheel.inputs);
  // 顯示dialog
  const [showDialog, setShowDialog] = useState(false);
  // 選中的選項
  const [selectedAward, setSelectedAward] = useState("");

  //用來追蹤是否正在旋轉
  const [isSpinning, setIsSpinning] = useState(false);

  //檢查 inputs 的數量並在需要時添加'再轉一次'選項(如果inputs 的選項為單數時)
  const adjustedInputs = [...inputs];
  if (adjustedInputs.length % 2 !== 0) {
    adjustedInputs.push({
      id: "reroll",
      value: "再轉一次",
      isNew: false,
      hasError: false,
    });
  }

  // 轉盤選項
  const awards = adjustedInputs.map((input, index) => ({
    id: index + 1,
    name: input.value,
    level: `${index + 1}`,
    color: index % 2 === 0 ? "#FFC200" : "#FFE122",
  }));

  //轉盤相關設置
  const wheelRadius = 150;
  const [rotateValue] = useState(new Animated.Value(0));
  const rotateRef = useRef(rotateValue);

  //開始旋轉方法
  const startSpinning = () => {
    // 防止重複點擊 '開始'
    if (isSpinning) return;

    setIsSpinning(true); // 設置為旋轉中

    // 旋轉的隨機值 1800-2159之間隨機整數(* 5 轉5圈的意思)
    const randomValue = Math.floor(Math.random() * 360) + 360 * 10;

    Animated.timing(rotateRef.current, {
      toValue: randomValue,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      const finalAngle = randomValue % 360;
      rotateRef.current.setValue(finalAngle);
      // 計算最終停在哪個選項
      const selectedAwardIndex = Math.floor(
        (360 - finalAngle) / (360 / awards.length)
      );

      setSelectedAward(awards[selectedAwardIndex].name);
      // show dialog
      setTimeout(() => {
        setShowDialog(true);
        //旋轉結束後重置
        setIsSpinning(false);
      }, 300);
    });
  };

  const renderWheelItems = () => {
    //設置轉盤的起始角度
    const startRadian = -Math.PI / 2;
    //每個獎項所佔的角度
    const RadianGap = (2 * Math.PI) / awards.length;
    // 當前角度
    let currentRadian = startRadian;

    return awards.map((item, index) => {
      //每個獎項的結束角度
      const endRadian = currentRadian + RadianGap;
      const largeArcFlag = endRadian - currentRadian <= Math.PI ? "0" : "1";
      // x1 、y1 起始點座標
      const x1 = wheelRadius + wheelRadius * Math.cos(currentRadian);
      const y1 = wheelRadius + wheelRadius * Math.sin(currentRadian);
      // x2、y2 結束點座標
      const x2 = wheelRadius + wheelRadius * Math.cos(endRadian);
      const y2 = wheelRadius + wheelRadius * Math.sin(endRadian);

      const pathData = `M${wheelRadius},${wheelRadius} L${x1},${y1} A${wheelRadius},${wheelRadius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

      const textX =
        wheelRadius +
        (wheelRadius - 50) * Math.cos(currentRadian + RadianGap / 2);
      const textY =
        wheelRadius +
        (wheelRadius - 50) * Math.sin(currentRadian + RadianGap / 2);

      currentRadian += RadianGap;

      return (
        <G key={index}>
          <Path d={pathData} fill={item.color} />
          <Text
            x={textX}
            y={textY}
            fontSize="16"
            textAnchor="middle"
            transform={`rotate(${
              (currentRadian - RadianGap / 2) * (180 / Math.PI)
            }, ${textX}, ${textY})`}
          >
            {item.name}
          </Text>
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Dialog overlayStyle={styles.dialog} isVisible={showDialog}>
          <Dialog.Title title="恭喜!" titleStyle={styles.dialogTitle} />

          <View style={styles.dialogContent}>
            <RNText style={styles.dialogText}>抽中【{selectedAward}】！</RNText>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text="重新輸入"
              color="#D6F5FF"
              onPress={() => {
                dispatch(clearInputs());
                setShowDialog(false);
                setTimeout(() => {
                  navigation.navigate("Yes");
                }, 0);
              }}
            />

            <Button
              text="再轉一次"
              color="#B5EEA7"
              onPress={() => {
                setShowDialog(false);
                setTimeout(() => {
                  startSpinning();
                }, 0);
              }}
            />
          </View>
        </Dialog>
      </View>

      {/* 箭頭 */}
      <View
        style={{
          marginTop: 30,
        }}
      >
        <Svg width="45" height="45" viewBox="0 0 10 10">
          <Polygon points="5,10 0, 0 10,0" fill="#ff5f1a" />
        </Svg>
      </View>
      <View style={styles.wheelContainer}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateRef.current.interpolate({
                  //動畫值範圍
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        >
          <Svg width="380" height="380" viewBox="0 0 300 300">
            {renderWheelItems()}

            <Circle
              cx="150"
              cy="150"
              r="40"
              fill="#ff5f1a"
              stroke="white"
              strokeWidth="5"
            />
          </Svg>
        </Animated.View>
      </View>
      <TouchableOpacity
        onPress={startSpinning}
        style={styles.button}
        disabled={isSpinning}
      >
        <RNText style={styles.buttonText}>開始</RNText>
      </TouchableOpacity>
    </View>
  );
};

export default Roulette;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wheelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    top: "54%",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  pointerContainer: {
    position: "absolute",
    top: 0,
    zIndex: 1,
  },

  dialog: {
    borderWidth: 10,
    borderColor: "#8FFF00",
    width: 400,
  },
  dialogTitle: {
    top: -50,
    backgroundColor: "#FF8C8C",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 14,
    marginBottom: -25,
    marginHorizontal: 60,
    fontSize: 30,
  },

  dialogContent: {
    backgroundColor: "#FFE4BA",
    height: 150,

    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },

  dialogText: {
    color: "#000",
    fontSize: 30,
  },

  dialogTitleView: {
    backgroundColor: "#FF8C8C",
  },

  dialogTextView: {
    backgroundColor: "#FFE4BA",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
    // bottom:20
    top: 50,
    // marginTop:300
    // display: "flex",
    // alignItems:'center',
    // justifyContent: "flex-end",
    justifyContent: "center",
    // padding: 10,
  },

  dialogButtonText: {
    color: "#000",
    // paddingHorizontal: 10,
    fontSize: 24,
  },
});
