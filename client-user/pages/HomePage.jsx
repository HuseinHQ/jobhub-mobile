import { View, Text, ScrollView, FlatList } from "react-native";
import JobCard from "../components/JobCard";
import GreetingCard from "../components/GreetingCard";
import { gql, useQuery } from "@apollo/client";
import LottieView from "lottie-react-native";

const GET_JOBS = gql`
  query FetchJobs {
    jobs {
      id
      createdAt
      title
      Company {
        companyLogo
        name
        location
      }
    }
  }
`;

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_JOBS);
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

  if (error)
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

  return (
    <View>
      <FlatList
        data={data.jobs}
        renderItem={({ item }) => <JobCard data={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<GreetingCard />}
      />
    </View>
  );
}
