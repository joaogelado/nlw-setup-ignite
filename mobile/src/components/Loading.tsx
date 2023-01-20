import { ActivityIndicator, View } from "react-native";
import Logo from "../assets/logo.svg";

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#09090a",
      }}
    >
      <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  );
}
