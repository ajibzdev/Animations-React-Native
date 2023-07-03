import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

type itemsType = {
  id: number;
};

const LayoutAnimation = () => {
  const [items, setItems] = React.useState<itemsType[]>([{ id: 1 }]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(1);

  const addHandler = () => {
    setItems((currentItems: any) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      setCurrentIndex(() => nextItemId);
      return [...currentItems, { id: nextItemId }];
    });
  };

  const onDelete = useCallback((itemId: number) => {
    setItems((currentItem) => {
      return currentItem.filter((item) => item.id !== itemId);
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView
        style={[styles.scrollView]}
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        {items.map((item, i) => {
          return (
            <Animated.View
              style={[styles.listItem]}
              key={i}
              onTouchEnd={() => {
                console.log(currentIndex);
                onDelete(currentIndex);
                addHandler();
              }}
              entering={ZoomIn}
              exiting={ZoomOut}
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          onDelete(1);
          addHandler;
        }}
      >
        <Feather name="plus" color={"white"} size={36} />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default LayoutAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flex: 1,
    position: "relative",
  },
  listItem: {
    backgroundColor: "rgba(0, 0, 258, .6)",
    borderRadius: 8,
    width: "90%",
    marginVertical: 10,
    height: 100,
    alignSelf: "center",
    elevation: 5,
    shadoewOpacity: 0.15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  floatingButton: {
    height: 80,

    width: 80,
    aspectRatio: 1,
    backgroundColor: "black",
    borderRadius: 40,
    position: "absolute",
    right: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: 50,
    zIndex: 4,
  },
});
