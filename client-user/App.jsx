import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./Navigator/TabNavigator";
import { View } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
