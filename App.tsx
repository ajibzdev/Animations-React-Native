import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Intro from "./screens/Intro";
import AnimatedFunctions from "./screens/AnimatedFunctions";
import PanGesutreHandler from "./screens/PanGesutreHandler";
import InterpolateScroll from "./screens/InterpolateScroll";
import LayoutAnimation from "./screens/LayoutAnimation";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Intro} />
        <Stack.Screen
          name="AnimatedFunctionScreen"
          component={AnimatedFunctions}
        />
        <Stack.Screen
          name="PanGestureHandlerScreen"
          component={PanGesutreHandler}
        />

        <Stack.Screen
          name="InterpolateScrollScreen"
          component={InterpolateScroll}
        />

        <Stack.Screen
          name="LayoutAnimationScreen"
          component={LayoutAnimation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
