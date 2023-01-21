import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

export function EmptyHabitList() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 items-center justify-center mt-6">
      <Text className="text-white text-lg font-semibold text-center">
        Você ainda não tem nenhum hábito cadastrado...
      </Text>
      <Text
        className="text-violet-400 text-lg font-bold active:text-violet-500 underline underline-offset-2 text-center"
        onPress={() => navigate("new")}
      >
        ...mas que tal criar um agora?
      </Text>
    </View>
  );
}
