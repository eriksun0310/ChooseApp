import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text as RNText,
} from 'react-native';
import Svg, { Circle, G, Text, Path, Polygon } from 'react-native-svg';

const Roulette = () => {
  const awards = [
    { id: 1, name: '一等奖', level: '1', color: '#FFC200' },
    { id: 2, name: '二等奖', level: '2', color: '#FFE122' },
    { id: 3, name: '三等奖', level: '3', color: '#FFC200' },
    { id: 4, name: '四等奖', level: '4', color: '#FFE122' },
    { id: 5, name: '五等奖', level: '5', color: '#FFC200' },
    { id: 6, name: '六等奖', level: '6', color: '#FFE122' },
  ];

  const wheelRadius = 150;
  const [rotateValue] = useState(new Animated.Value(0));
  const [isSpinning, setIsSpinning] = useState(false);

  const startSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * awards.length);
    const selectedAngle = (randomIndex * (360 / awards.length)) + 360 * 3; // 多轉幾圈

    Animated.timing(rotateValue, {
      toValue: selectedAngle,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
    });
  };

  const renderWheelItems = () => {
    const angleByItem = (2 * Math.PI) / awards.length;

    return awards.map((item, index) => {
      const startAngle = index * angleByItem;
      const endAngle = startAngle + angleByItem;

      const path = [
        `M ${wheelRadius} ${wheelRadius}`,
        `L ${wheelRadius + wheelRadius * Math.cos(startAngle)} ${wheelRadius + wheelRadius * Math.sin(startAngle)}`,
        `A ${wheelRadius} ${wheelRadius} 0 0 1 ${wheelRadius + wheelRadius * Math.cos(endAngle)} ${wheelRadius + wheelRadius * Math.sin(endAngle)}`,
        'Z',
      ].join(' ');

      const textAngle = startAngle + angleByItem / 2;
      const textX = wheelRadius + (wheelRadius - 40) * Math.cos(textAngle);
      const textY = wheelRadius + (wheelRadius - 40) * Math.sin(textAngle);

      return (
        <G key={index}>
          <Path d={path} fill={item.color} />
          <Text
            x={textX}
            y={textY}
            fill="black"
            fontSize="16"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform={`rotate(${(textAngle * 180) / Math.PI}, ${textX}, ${textY})`}
          >
            {item.name}
          </Text>
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointerContainer}>
        <Svg width="20" height="20" viewBox="0 0 10 10">
          <Polygon points="5,0 10,10 0,10" fill="blue" />
        </Svg>
      </View>
      <Animated.View
        style={{
          transform: [
            {
              rotate: rotateValue.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      >
        <Svg width="300" height="300" viewBox="0 0 300 300">
          {/* <Circle cx="150" cy="150" r="150" fill="lightgray" stroke="black" strokeWidth="2" /> */}
          {renderWheelItems()}
          {/* <Circle cx="150" cy="150" r="40" fill="white" stroke="black" strokeWidth="2" /> */}
    
        </Svg>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={startSpin} disabled={isSpinning}>
        <RNText style={styles.buttonText}>開始</RNText>
      </TouchableOpacity>
    </View>
  );
};

export default Roulette;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointerContainer: {
    position: 'absolute',
    top: '35%',
    zIndex: 1,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
