import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { clearInputs } from "../store/wheelSlice";

/*
 Animated.timing:精確時間控制和線性速度的動畫效果
 Animated.spring:有彈性和自然物理效果的動畫
 */

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [showBtn, setShowBtn] = useState(false);

  const fullText1 = "嗨!";
  const fullText2 = "今天又選擇障礙了嗎？";

  const bounceAnim = useRef(new Animated.Value(0)).current;

  // 處理打字機效果
  useEffect(() => {
    let time1: NodeJS.Timeout;
    let time2: NodeJS.Timeout;

    let index1 = 0;
    let index2 = 0;

    const typeWrite1 = () => {
      setDisplayText1(fullText1.slice(0, index1 + 1));
      index1++;
      if (index1 < fullText1.length) {
        time1 = setTimeout(typeWrite1, 100);
      } else {
        time2 = setTimeout(typeWrite2, 1000); // 延遲一秒後開始第二個文本段的打字機效果
      }
    };

    const typeWrite2 = () => {
      setDisplayText2(fullText2.slice(0, index2 + 1));
      index2++;
      if (index2 < fullText2.length) {
        time2 = setTimeout(typeWrite2, 100);
      } else {
        setShowBtn(true);
      }
    };

    // 開始第一個文本段的打字機效果
    time1 = setTimeout(typeWrite1, 500); // 延遲一秒後开始開始第一個文本段的打字機效果

    //清除定時器
    return () => {
      if (time1) clearTimeout(time1);
      if (time2) clearTimeout(time2);
    };
  }, []);

  //Btn 的動畫
  useEffect(() => {
    if (showBtn) {
      setTimeout(() => {
        //開始淡入動畫
        // Animated.timing(bounceAnim, {
        //   toValue: 1,
        //   duration: 1000, //持續時間
        //   useNativeDriver: true,
        // }).start();

        // 開始彈跳效果
        Animated.spring(bounceAnim, {
          toValue: 1, //目標值
          friction: 5, // 摩擦力(值越小,彈跳力越大)
          useNativeDriver: true, //使用原生動畫驅動動畫(減少動畫卡頓現象)
        }).start();
      }, 500);
    }
  }, [showBtn]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>選擇障礙神器</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>{displayText1}</Text>
        <Text style={styles.contentText}>{displayText2}</Text>
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
              text="NO!"
              color="#F77676"
              onPress={() => navigation.navigate("No")}
            />

            <Button
              text="YES!"
              color="#B5EEA7"
              onPress={() => {
                dispatch(clearInputs());
                navigation.navigate("Yes");
              }}
            />
          </>
        )}
      </Animated.View>
    </View>
  );
};

export default HomeScreen;

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
