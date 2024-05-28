import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import CustomButton from "./CustomButton";
import React from "react";

export default function ErrorOverlay({onConfirm, message}: any) {
  return <View style={styles.container}>
    <Text style={[styles.title, styles.text]}>Error!</Text>
    <Text style={styles.text}>{message}</Text>
    <CustomButton onPress={onConfirm}>Ok</CustomButton>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    textAlign: 'center',
    color: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});