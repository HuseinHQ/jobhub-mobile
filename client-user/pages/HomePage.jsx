import { View, StatusBar, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";

export default function HomePage() {
  return (
    <View style={style.AndroidSafeArea}>
      <View className="bg-white p-4">
        <Text className="text-blue-900 text-center text-lg font-extrabold">Rekomendasi Pekerjaan</Text>
      </View>

      <ScrollView>
        <View className="bg-white m-2 p-4 rounded">
          <View></View>
          <View className="gap-2">
            <Text className="text-lg font-extrabold leading-6">Rekomendasi pekerjaan terbaik segera hadir</Text>
            <Text>Kami sedang mengembangkan aplikasi kami untuk memberikan pekerjaan yang pas buatmu</Text>
            <TouchableOpacity>
              <Text className="font-bold">Info selengkapnya {">"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-white m-2 p-4 rounded">
          <Image />
          <View>
            <Text className="text-blue-700 font-bold">{"IT SUPPORT (Area : Bengkulu & Lampung)"}</Text>
            <Image />
          </View>
        </View>
      </ScrollView>

      <View className="bg-white p-4">
        <Text className="text-blue-900 text-center text-lg font-extrabold">Rekomendasi Pekerjaan</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "rgb(241 245 249)",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
