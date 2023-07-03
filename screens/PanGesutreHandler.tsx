import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const Size = 100;
const Radius = Size * 2;

type ContextInterface = {
  translateX: number;
  translateY: number;
};

const PanGesutreHandler = () => {
  // Shared Value
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // const handle pan
  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (event, context) => {
      context.translateX = event.translationX;
      context.translateY = event.translationY;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < Radius) {
        translateX.value = withSpring(0, {});
        translateY.value = withSpring(0);
      }
    },
  });

  //   Style
  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View style={styles.circle}>
            <Animated.View style={[styles.box, uas]} />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

export default PanGesutreHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: Size,
    width: Size,
    backgroundColor: "rgba(0, 0, 256, .6)",
    borderRadius: 8,
  },
  circle: {
    width: Radius * 2,
    height: Radius * 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius * 2,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 256, .6)",
  },
});
