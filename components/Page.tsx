import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const { height, width } = Dimensions.get("window");

const Size = width * 0.7;

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  // Input Range
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  // Animated Stle
  const vStyle = useAnimatedStyle(() => {
    const scale = interpolate(translateX.value, inputRange, [0, 1, 0]);
    const borderRadius = interpolate(translateX.value, inputRange, [
      Size,
      Size / 4,
      Size,
    ]);

    return {
      transform: [{ scale: scale }],
      borderRadius,
    };
  });
  const tStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);
    const translateY = interpolate(translateX.value, inputRange, [
      height / 2,
      0,
      -height / 2,
    ]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View
      style={[
        styles.view,
        { backgroundColor: `rgba(0, 0, 256, 0.${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, vStyle]}>
        <Animated.View style={[styles.textContainer, tStyle]}>
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  view: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: Size,
    height: Size,
    backgroundColor: "rgba(0, 0, 256, .4)",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 36,
  },
});
