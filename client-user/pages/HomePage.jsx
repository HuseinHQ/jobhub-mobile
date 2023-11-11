import { useEffect, useState } from "react";
import { View, StatusBar, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native";
import JobCard from "../components/JobCard";
// import axios from "axios";
import GreetingCard from "../components/GreetingCard";
import { gql, useQuery } from "@apollo/client";

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
  console.log(data);
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text>Error</Text>
      </View>
    );

  return (
    <View>
      <ScrollView>
        <GreetingCard />
        <FlatList data={data.jobs} renderItem={({ item }) => <JobCard data={item} />} keyExtractor={(item) => item.id} />
      </ScrollView>
    </View>
  );
}
