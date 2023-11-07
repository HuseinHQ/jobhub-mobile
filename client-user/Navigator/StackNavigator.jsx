import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";

export function HomeStackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name="detail" component={DetailPage} />
    </Stack.Navigator>
  );
}
