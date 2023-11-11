import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import { StyleSheet } from "react-native";

export function HomeStackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomePage}
        options={{ title: "Rekomendasi Pekerjaan", headerTintColor: "#1E3A8A", headerTitleStyle: { fontWeight: "bold" }, headerTitleAlign: "center" }}
      />
      <Stack.Screen name="detail" component={DetailPage} />
    </Stack.Navigator>
  );
}

const style = StyleSheet.create({
  homeHeaderStyle: {
    backgroundColor: "black",
  },
});
