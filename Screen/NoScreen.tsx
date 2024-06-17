import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

const NoScreen = () => {
  const navigation = useNavigation();
  const [displayText1, setDisplayText1] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  const fullText = "還選No啊！";

  const bounceAnim = useRef(new Animated.Value(0)).current;

  // 處理打字機效果
  useEffect(() => {
    let time: NodeJS.Timeout;
    // let time2: NodeJS.Timeout;

    let index = 0;
    // let index2 = 0;

    const typeWrite1 = () => {
      setDisplayText1(fullText.slice(0, index + 1));
      index++;
      if (index < fullText.length) {
        time = setTimeout(typeWrite1, 100);
      } else {
        setShowBtn(true);
      }
    };
    // 開始第一個文本段的打字機效果
    time = setTimeout(typeWrite1, 500); // 延遲一秒後开始開始第一個文本段的打字機效果

    //清除定時器
    return () => {
      if (time) clearTimeout(time);
    };
  }, []);

  //Btn 的動畫
  useEffect(() => {
    setTimeout(() => {
      if (showBtn) {
        // 開始彈跳效果
        Animated.spring(bounceAnim, {
          toValue: 1, //目標值
          friction: 5, // 摩擦力(值越小,彈跳力越大)
          useNativeDriver: true, //使用原生動畫驅動動畫(減少動畫卡頓現象)
        }).start();
      }
    }, 500);
  }, [showBtn]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>選擇障礙神器</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>{displayText1}</Text>
      </View>

      <Animated.View
        style={[
          styles.footer,
          // { opacity: bounceAnim }
          {
            transform: [
              {
                translateY: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [200, 0],
                }),
              },
            ],
          },
        ]}
      >
        {showBtn && (
          <>
            <Button
              text="BACK"
              color="#FFCD4B"
              onPress={() => navigation.navigate("Home")}
            />
          </>
        )}
      </Animated.View>
    </View>
  );
};

export default NoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5E8",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 1,
    marginTop: 80,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
  },
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 16,
  },

  footer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 100,
    alignItems: "center",
  },
});
