import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../pages/HomePage";
import Foundation from "@expo/vector-icons/Foundation";
import { HomeStackNavigator } from "./StackNavigator";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Beranda"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Foundation name="home" color={color} size={size} />,
        }}
      />
      {/* <Tab.Screen name="Cari" component={HomePage} /> */}
    </Tab.Navigator>
  );
}
