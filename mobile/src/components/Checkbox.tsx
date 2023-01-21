import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean;
  title: string;
}

export function Checkbox({ checked = false, title, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`flex-row mb-2 items-center transition duration-500`}
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Feather name="check" color={colors.white} size={20} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg"></View>
      )}

      <Text className={`text-white text-base ml-3 font-semibold`}>{title}</Text>
    </TouchableOpacity>
  );
}
