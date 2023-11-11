import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function JobCard({ data }) {
  const navigation = useNavigation();

  function formatDate() {
    const targetDate = new Date(data.createdAt);
    const today = new Date();
    const timeGap = today - targetDate;

    const second = Math.floor(timeGap / 1000);
    const minute = Math.floor(second / 60);
    const hour = Math.floor(minute / 60);
    const day = Math.floor(hour / 24);

    if (second < 60) {
      return `${second} detik yang lalu`;
    } else if (minute < 60) {
      return `${minute} menit yang lalu`;
    } else if (hour < 24) {
      return `${hour} jam yang lalu`;
    } else {
      return `${day} hari yang lalu`;
    }
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("detail", {
          id: data.id,
        })
      }
      className="bg-white p-4 mx-2 my-1 rounded border-l-4 border-l-blue-600"
    >
      <Image source={{ uri: data.Company?.companyLogo }} style={styles.thumbnail} />
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-blue-700 font-bold text-lg">{data.title}</Text>
          <Text className="text-slate-500">{data.Company?.name}</Text>
        </View>
        <Feather name="bookmark" size={24} color="#A3A3A3" />
      </View>
      <Text className="font-bold mt-2">{data.Company?.location}</Text>
      <Text className="text-slate-400 mt-2 text-xs">{formatDate()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 80,
    height: 40,
    resizeMode: "contain",
  },
});
