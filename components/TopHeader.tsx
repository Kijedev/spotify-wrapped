import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isWhiteBackground: boolean;
  muted: boolean;
  onBack: () => void;
  onToggleMute: () => void;
};

const TopHeader: React.FC<Props> = ({
  isWhiteBackground,
  muted,
  onBack,
  onToggleMute,
}) => {
  const iconColor = isWhiteBackground ? "black" : "white";

  const logoSource = isWhiteBackground
    ? require("@/assets/images/logo.png")
    : require("@/assets/images/logo-white.png");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="chevron-back-outline" size={28} color={iconColor} />
      </TouchableOpacity>

      <Image source={logoSource} style={styles.logo} />

      <TouchableOpacity onPress={onToggleMute}>
        <Ionicons
          name={muted ? "volume-mute-outline" : "volume-medium-outline"}
          size={26}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: 50,
    paddingBottom: 10,
    zIndex: 999,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: "contain",
  },
});
