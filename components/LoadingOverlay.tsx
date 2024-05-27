import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

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