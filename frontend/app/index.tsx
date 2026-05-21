
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const SplashScreen = () => {
  const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.replace("/(auth)/welcome");
  //   }, 1500);
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.neutral900}
        barStyle="light-content"
      />
      <Animated.Image
        source={require("@/assets/images/splashImage.png")}
        style={styles.logo}
        entering={FadeInDown.duration(700).springify()}
        resizeMode="contain"
      />

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({



  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900
  },
  logo: {
    aspectRatio: 1,
    height: "23%"
  }


});
