import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "../components/Page";

const Words = ["Bolu", "Is", "An", "Angel"];

const InterpolateScroll = () => {
  // shared value
  const translateX = useSharedValue(0);

  // Handler
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      style={[styles.container]}
      horizontal
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {Words.map((title, i) => {
        return <Page title={title} index={i} key={i} translateX={translateX} />;
      })}
    </Animated.ScrollView>
  );
};

export default InterpolateScroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
});
