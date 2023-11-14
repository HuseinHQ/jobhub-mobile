import { NavigationContainer } from "@react-navigation/native";
// import TabNavigator from "./Navigator/TabNavigator";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import StackNavigator from "./Navigator/StackNavigator";

const client = new ApolloClient({
  uri: "https://56d6-103-165-209-194.ngrok-free.app",
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
