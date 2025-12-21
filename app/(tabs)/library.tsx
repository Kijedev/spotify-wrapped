import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const library = () => {
  return (
    <SafeAreaView>
      <Text style={{ color: "white", textAlign: "center", fontSize: 50 }}>
        library
      </Text>
    </SafeAreaView>
  );
};

export default library;

const styles = StyleSheet.create({});
