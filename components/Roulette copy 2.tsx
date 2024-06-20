import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { Svg, G, Path, Text as SvgText } from 'react-native-svg';
import { Easing } from 'react-native-reanimated';

const App = () => {
  const [segments, setSegments] = useState([]);
  const [inputText, setInputText] = useState('');
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);

  const addSegment = () => {
    if (inputText) {
      setSegments([...segments, inputText]);
      setInputText('');
    }
  };

  const spinWheel = () => {
    if (spinning || segments.length === 0) return;
    setSpinning(true);
    const randomDegree = Math.floor(Math.random() * 360) + 360 * 3; // At least 3 full rotations
    setRotation(randomDegree);

    setTimeout(() => {
      const winningIndex = Math.floor(((randomDegree % 360) / 360) * segments.length);
      Alert.alert(`恭喜！您贏得了: ${segments[winningIndex]}`);
      setSpinning(false);
    }, 3000); // Duration should match the CSS animation duration
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={segments}
        renderItem={({ item }) => <Text style={styles.segment}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="輸入轉盤品項"
      />
      <TouchableOpacity onPress={addSegment} style={styles.addButton}>
        <Text style={styles.addButtonText}>增加品項</Text>
      </TouchableOpacity>
      <View style={styles.wheelContainer}>
        <Svg width={300} height={300} viewBox="0 0 100 100">
          <G transform={`rotate(${rotation}, 50, 50)`}>
            {segments.map((segment, index) => {
              const angle = 360 / segments.length;
              const startAngle = index * angle;
              const endAngle = startAngle + angle;
              const largeArcFlag = angle > 180 ? 1 : 0;

              const start = polarToCartesian(50, 50, 40, endAngle);
              const end = polarToCartesian(50, 50, 40, startAngle);

              const pathData = [
                `M 50 50`,
                `L ${start.x} ${start.y}`,
                `A 40 40 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
                `Z`
              ].join(' ');

              return (
                <Path key={index} d={pathData} fill={index % 2 === 0 ? '#FFC200' : '#FFE122'} />
              );
            })}
          </G>
        </Svg>
      </View>
      <TouchableOpacity onPress={spinWheel} style={styles.spinButton} disabled={spinning}>
        <Text style={styles.spinButtonText}>開始</Text>
      </TouchableOpacity>
    </View>
  );
};

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '80%',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  wheelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  spinButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  spinButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  segment: {
    fontSize: 18,
    padding: 5,
  },
});

export default App;
