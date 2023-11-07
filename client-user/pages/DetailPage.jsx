import { useRoute } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

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

  return (
    <View className="bg-white">
      <Image source={{ uri: data.Company?.companyLogo }} className="w-20 h-20" />
    </View>
  );
}
