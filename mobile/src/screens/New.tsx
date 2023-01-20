import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";
import { useNavigation } from "@react-navigation/native";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [title, setTitle] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);

  const isFormCompleted = title.trim() && selectedWeekDays.length > 0;

  const { navigate } = useNavigation();

  function handleToggleWeekDay(weekDayIndex: number) {
    if (selectedWeekDays.includes(weekDayIndex)) {
      setSelectedWeekDays((prevState) =>
        prevState.filter((day) => day !== weekDayIndex)
      );
    } else {
      setSelectedWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateHabit() {
    try {
      if (!isFormCompleted) {
        return Alert.alert("Ops...", "Preencha todos os campos.");
      }

      await api.post("/habits", {
        title,
        weekDays: selectedWeekDays,
      });

      setTitle("");
      setSelectedWeekDays([]);
      Alert.alert("Criar hábito", "Hábito criado com sucesso.", [
        {
          text: ":D",
        },
      ]);
      navigate("home");
    } catch (error) {
      console.error(error);
      Alert.alert("Ops...", "Não foi possível criar o hábito.");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          placeholder="Exercitar, ler 10 páginas, dormir bem..."
          className="h-12 pl-4 rounded-lg mt-3 placeholder:font-semibold bg-zinc-900 border-2 border-zinc-800 text-white focus:border-2 focus:border-emerald-600"
          placeholderTextColor={colors.zinc[700]}
          value={title}
          onChangeText={setTitle}
        />

        <Text className="mt-6 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((day, index) => (
          <Checkbox
            key={day}
            title={day}
            checked={selectedWeekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        {isFormCompleted ? (
          <TouchableOpacity
            onPress={handleCreateHabit}
            className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          >
            <Feather name="check" size={20} color={colors.white} />
            <Text className="text-white font-semibold text-base ml-2">
              Confirmar
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleCreateHabit}
            className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6 opacity-40"
            disabled={true}
          >
            <Feather name="check" size={20} color={colors.white} />
            <Text className="text-white font-semibold text-base ml-2">
              Preencha todos os campos.
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
