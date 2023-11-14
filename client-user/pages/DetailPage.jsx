import { useRoute } from "@react-navigation/core";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { gql, useQuery } from "@apollo/client";
import LottieView from "lottie-react-native";
import SkillItem from "../components/SkillItem";
import { Feather } from "@expo/vector-icons";

export default function DetailPage() {
  const route = useRoute();
  const { id } = route.params;

  const GET_JOB_BY_ID = gql`
    query FetchJobById($jobId: ID!) {
      job(id: $jobId) {
        Skills {
          id
          level
          name
        }
        Company {
          description
          email
          location
          name
          companyLogo
        }
        User {
          email
          username
        }
        createdAt
        updatedAt
        description
        jobType
        title
        id
      }
    }
  `;

  const { loading, data, error } = useQuery(GET_JOB_BY_ID, {
    variables: { jobId: id },
  });

  function formatDate(date) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const theDate = new Date(date);
    const formattedDate = theDate.toLocaleDateString("id-ID", options);
    return formattedDate;
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <LottieView
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../assets/loading.json")}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <LottieView
          autoPlay
          style={{
            width: 350,
            height: 350,
          }}
          source={require("../assets/error.json")}
        />
      </View>
    );
  }

  const alert = (title, msg) => Alert.alert(title, msg);

  return (
    <>
      <ScrollView className="gap-2">
        <View className="bg-white pb-3 px-2 gap-3">
          <View>
            <Image source={{ uri: data.job?.Company?.companyLogo }} style={styles.thumbnail} />
          </View>
          <View>
            <Text className="text-slate-800 text-lg font-bold">{data.job?.title}</Text>
            <Text className="text-slate-500">{data.job?.Company?.name}</Text>
          </View>
          <View>
            <Text className="text-slate-800 font-bold">{data.job?.Company?.location}</Text>
          </View>
          <View>
            <Text className="text-slate-400 text-xs">Ditayangkan pada {formatDate(data.job?.createdAt)}</Text>
            {/* <Text className="text-slate-400 text-xs">Diubah pada {formatDate(data.job?.updatedAt)}</Text> */}
          </View>
        </View>

        <View className="bg-white p-4">
          <View>
            <Text className="font-bold text-slate-800 text-base">Deskripsi Pekerjaan</Text>
            <Text className="text-slate-800 text-sm my-2">Tanggung Jawab Utama :</Text>
            <View className="flex-row gap-3">
              <Text className="text-slate-800 font-extrabold col-span-1">{"\u2022"}</Text>
              <Text className="text-slate-800 text-sm col-span-9">{data.job?.description}</Text>
            </View>
            <Text className="text-slate-800 text-sm my-2">Kualifikasi :</Text>
            {data.job?.Skills?.map((skill) => (
              <SkillItem skill={skill} key={skill.id} />
            ))}
          </View>
        </View>

        <View className="bg-white p-4">
          <View>
            <Text className="font-bold text-slate-800 text-base">Informasi Tambahan</Text>
          </View>
          <View className="my-2">
            <Text className="text-slate-800 pb-1">Jenis Pekerjaan</Text>
            <Text className="border-b border-slate-200 pb-3 text-slate-600">{data.job?.jobType}</Text>
          </View>
          <View>
            <Text className="text-slate-800 pb-1">Pemosting pekerjaan</Text>
            <Text className="text-slate-600">Username: {data.job?.User?.username}</Text>
            <Text className="text-slate-600">Email: {data.job?.User?.email}</Text>
          </View>
        </View>

        <View className="bg-white p-4">
          <View>
            <Text className="font-bold text-slate-800 text-base">Tentang Perusahaan</Text>
          </View>
          <View className="my-2">
            <Text className="text-slate-800 leading-5">{data.job?.Company?.description}</Text>
          </View>
        </View>

        <View className="bg-white p-4">
          <View>
            <Text className="font-bold text-slate-800 text-base">Hati-hati</Text>
          </View>
          <View className="my-2">
            <Text className="text-slate-800 leading-5">Jangan berikan informasi bank atau kartu kreditmu ketika melamar kerja</Text>
            <TouchableOpacity>
              <Text className="text-blue-700 leading-5 my-5">Pelajari bagaimana melindungi dirimu di sini</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-blue-700 leading-5">Laporkan iklan lowongan ini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View className="flex-row justify-center px-6 py-1.5 bg-white gap-2">
        <TouchableOpacity
          onPress={() => alert("Berhasil", "Pekerjaan berhasil disimpan!")}
          className="flex-row justify-center border-2 gap-x-2 rounded-sm border-blue-700 py-2 w-1/2"
        >
          <View>
            <Feather name="bookmark" size={24} color="#1d4ed8" />
          </View>
          <Text className="text-blue-700 font-bold text-center ">Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert("Berhasil", "Selamat anda diterima kerja!")}
          className="border-2 rounded-sm border-pink-600 bg-pink-600 py-2 w-1/2"
        >
          <Text className="text-white font-bold text-center">Lamar Sekarang</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
