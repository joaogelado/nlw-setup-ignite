import { View, TouchableOpacity, Text, Pressable, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import Logo from "../assets/logo.svg";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import clsx from "clsx";

export function Header() {
  const [easterEgg, setEasterEgg] = useState(false);

  console.log(easterEgg);

  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <Pressable
        className={`${
          easterEgg ? "bg-green-500 from-red-500 via-green-500 to-blue-500" : ""
        }`}
        onLongPress={() => setEasterEgg((oldState) => !oldState)}
      >
        <Logo />
      </Pressable>

      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
        onPress={() => navigate("new")}
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className="text-white ml-3 font-semibold text-base">Novo</Text>
      </TouchableOpacity>
    </View>
  );
}
