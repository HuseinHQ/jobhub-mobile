import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import TabNavigator from "./TabNavigator";

export default function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={TabNavigator}
        options={{
          title: "Rekomendasi Pekerjaan",
          headerTintColor: "#1E3A8A",
          headerTitleStyle: { fontWeight: "bold", fontSize: 16 },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="detail"
        component={DetailPage}
        options={({ route }) => ({
          title: route.params.title,
          headerTintColor: "#1E3A8A",
          headerTitleStyle: { fontWeight: "bold", fontSize: 16 },
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
}
