import "react-native-get-random-values";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screen/HomeScreen";
import NoScreen from "./Screen/NoScreen";
import YesScreen from "./Screen/YesScreen";
import RouletteScreen from "./Screen/RouletteScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Yes" component={YesScreen} />
        <Stack.Screen name="No" component={NoScreen} />
        <Stack.Screen name="Roulette" component={RouletteScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
