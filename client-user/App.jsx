import { NavigationContainer } from "@react-navigation/native";
// import TabNavigator from "./Navigator/TabNavigator";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import StackNavigator from "./Navigator/StackNavigator";

const client = new ApolloClient({
  uri: "https://f92d-202-80-218-75.ngrok-free.app",
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
