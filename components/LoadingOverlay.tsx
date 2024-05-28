import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import React from "react";

export default function LoadingOverlay() {
  return <View style={styles.container}>
    <ActivityIndicator color="#fff" size="large"/>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary700
  }
});