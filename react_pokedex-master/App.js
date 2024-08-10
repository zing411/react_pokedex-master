import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store";

import Home from "./components/Home";
import Detail from "./components/Detail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
