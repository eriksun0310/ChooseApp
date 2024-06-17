import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screen/HomeScreen";
import NoScreen from "./Screen/NoScreen";
import YesScreen from "./Screen/YesScreen";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
