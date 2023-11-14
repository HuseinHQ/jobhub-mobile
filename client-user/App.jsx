import { NavigationContainer } from "@react-navigation/native";
// import TabNavigator from "./Navigator/TabNavigator";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import StackNavigator from "./Navigator/StackNavigator";

const client = new ApolloClient({
  uri: "http://18.140.54.54/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
