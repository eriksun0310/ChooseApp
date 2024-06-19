import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text as RNText,
} from "react-native";
import Svg, { Circle, G, Text, Path, Polygon } from "react-native-svg";

const Roulette = () => {
  const [awards, setAwards] = useState([
    { id: 1, name: "一等奖", level: "1", color: "#FFC200" },
    { id: 2, name: "二等奖", level: "2", color: "#FFE122" },
    { id: 3, name: "三等奖", level: "3", color: "#FFC200" },
    { id: 4, name: "四等奖", level: "4", color: "#FFE122" },
    { id: 5, name: "五等奖", level: "5", color: "#FFC200" },
    { id: 6, name: "六等奖", level: "6", color: "#FFE122" },
  ]);

  const wheelRadius = 150;
  const [rotateValue] = useState(new Animated.Value(0));
  const rotateRef = useRef(rotateValue);

  const startSpinning = () => {
    const randomValue = Math.floor(Math.random() * 360) + 360 * 5;
    Animated.timing(rotateRef.current, {
      toValue: randomValue,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      rotateRef.current.setValue(randomValue % 360);
    });
  };

  const renderWheelItems = () => {
    const startRadian = -Math.PI / 2;
    const RadianGap = (2 * Math.PI) / awards.length;
    let currentRadian = startRadian;

    return awards.map((item, index) => {
      const endRadian = currentRadian + RadianGap;
      const largeArcFlag = endRadian - currentRadian <= Math.PI ? "0" : "1";
      const x1 = wheelRadius + wheelRadius * Math.cos(currentRadian);
      const y1 = wheelRadius + wheelRadius * Math.sin(currentRadian);
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
      <View
        style={{
          marginTop: 30,
        }}
      >
        <Svg width="30" height="30" viewBox="0 0 10 10">
          <Polygon points="5,10 0, 0 10,0" fill="#ff5f1a" />
        </Svg>
      </View>
      <View style={styles.wheelContainer}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: rotateRef.current.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        >
          <Svg width="300" height="300" viewBox="0 0 300 300">
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

      <TouchableOpacity onPress={startSpinning} style={styles.button}>
        <RNText style={styles.buttonText}>開始</RNText>
      </TouchableOpacity>
    </View>
  );
};

export default Roulette;

const styles = StyleSheet.create({
  container: {
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
    top: "53%",
    // backgroundColor: "#ffffff",
    // borderRadius: 50,
    // paddingTop: 50,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,

    fontWeight: "bold",
  },

  pointerContainer: {
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
});
