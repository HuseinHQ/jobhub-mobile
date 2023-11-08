import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default function DetailPage() {
  const route = useRoute();
  const { id } = route.params;

  const [data, setData] = useState({});
  useEffect(() => {
    fetchDataById(id);
  }, []);

  const fetchDataById = async (id) => {
    try {
      const response = await fetch("https://jobhub-server.huseinhk.me/public/jobs/" + id);
      if (!response.ok) {
        throw { name: "fetch_error" };
      }
      const resposneBody = await response.json();
      setData(resposneBody);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDate() {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const theDate = new Date(data.createdAt);
    const formattedDate = theDate.toLocaleDateString("id-ID", options);
    return formattedDate;
  }

  return (
    <ScrollView className="gap-2">
      <View className="bg-white pb-3 px-2 gap-3">
        <View className="pl-5">
          <Image source={{ uri: data.Company?.companyLogo }} className="w-10 h-10 " />
        </View>
        <View>
          <Text className="text-slate-800 text-lg font-bold">{data.title}</Text>
          <Text className="text-slate-500">{data.Company?.name}</Text>
        </View>
        <View>
          <Text className="text-slate-800 font-bold">{data.Company?.location}</Text>
        </View>
        <View>
          <Text className="text-slate-400 text-xs">Ditayangkan pada {formatDate()}</Text>
        </View>
      </View>

      <View className="bg-white p-4">
        <View>
          <Text className="font-bold text-slate-800 text-base">Deskripsi Pekerjaan</Text>
          <Text className="text-slate-800 text-sm mt-2">Tanggung Jawab Utama :</Text>
          <View className="grid grid-cols-10 gap-2">
            <Text className="text-slate-800 font-extrabold text-lg col-span-1">{"\u2022"}</Text>
            <Text className="text-slate-800 text-sm col-span-9">{data.description}</Text>
          </View>
          <Text className="font-bold text-slate-800 text-base">Deskripsi Pekerjaan</Text>
        </View>
      </View>
    </ScrollView>
  );
}
