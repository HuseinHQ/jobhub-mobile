import { View, Text, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function JobCard({ data }) {
  const navigation = useNavigation();

  function formatDate() {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const theDate = new Date(data.createdAt);
    const formattedDate = theDate.toLocaleDateString("id-ID", options);
    return formattedDate;
  }

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("detail", {
          id: data.id,
        })
      }
    >
      <Image className="m-3" source={{ uri: data.Company?.companyLogo }} style={{ width: 40, height: 40 }} />
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-blue-700 font-bold text-lg">{data.title}</Text>
          <Text className="text-slate-500">{data.Company?.name}</Text>
        </View>
        <Feather name="bookmark" size={24} color="black" />
      </View>
      <Text className="font-bold mt-2">{data.Company?.location}</Text>
      <Text className="text-slate-400 mt-2 text-xs">{formatDate()}</Text>
    </Pressable>
  );
}
