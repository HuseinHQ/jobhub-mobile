import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function GreetingCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftSide}>
        <Image source={require("../assets/phone.jpg")} style={styles.imageStyle} />
      </View>
      <View style={styles.rightSide}>
        <Text className="text-lg font-extrabold leading-6">Rekomendasi pekerjaan terbaik segera hadir</Text>
        <Text className="text-xs text-slate-600">Kami sedang mengembangkan aplikasi kami untuk memberikan pekerjaan yang pas buatmu</Text>
        <TouchableOpacity className="flex-row">
          <Text className="font-bold">Info selengkapnya</Text>
          <MaterialIcons name="navigate-next" size={24} color="black" className="font-light" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 4,
    gap: 8,
  },
  leftSide: {
    flex: 3,
  },
  rightSide: {
    flex: 7,
    gap: 6,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
