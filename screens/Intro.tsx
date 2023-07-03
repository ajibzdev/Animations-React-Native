import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Intro = ({ navigation, route }: any) => {
  return (
    <View style={styles.container}>
      <Button
        title="Animated Function"
        onPress={() => {
          navigation.navigate("AnimatedFunctionScreen");
        }}
      />

      <Button
        title="Pan Gesture Handler"
        onPress={() => {
          navigation.navigate("PanGestureHandlerScreen");
        }}
      />
      <Button
        title="Interpolate With Scroll View"
        onPress={() => {
          navigation.navigate("InterpolateScrollScreen");
        }}
      />

      <Button
        title="Layout Animation"
        onPress={() => {
          navigation.navigate("LayoutAnimationScreen");
        }}
      />
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
