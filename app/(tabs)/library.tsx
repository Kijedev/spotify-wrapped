import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const library = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor="#111"
      />
      <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
        Library
      </Text>
    </SafeAreaView>
  );
};

export default library;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
});
