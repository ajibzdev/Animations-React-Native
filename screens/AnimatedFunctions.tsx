import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

// Size
const Size = 100;
// Count
const COUNT = 10;
const colors = ["blue", "orangered", "skyblue"];

const calculateBg = (value: Animated.AnimateStyle<number>) => {
  "worklet";
  return colors[value];
};

export default function AnimatedFunctions() {
  const opacityValue = useSharedValue(1);
  const scale = useSharedValue(1);
  const bg = useSharedValue(0);
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const arr = new Array(COUNT).fill(0).map((_, i) => {
    id: i;
  });

  // Style
  const uas = useAnimatedStyle(() => {
    return {
      opacity: opacityValue.value,
      borderRadius: opacityValue.value * Size,
      transform: [
        { scale: scale.value },
        { rotate: `${opacityValue.value * Math.PI * 2}rad` },
      ],
      backgroundColor: calculateBg(bg.value),
    };
  }, [isActive]);

  React.useEffect(() => {
    opacityValue.value = withRepeat(
      withTiming(0.5, { duration: 300 }),
      -1,
      true
    );
    scale.value = withRepeat(withSpring(2, { velocity: 0.6 }), -1, true);
    bg.value = withRepeat(withTiming(2, { duration: 600 }), -1, true);
  }, [isActive]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, uas]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: Size,
    width: Size,
    backgroundColor: "orangered",
  },
});
