import { View, Text, ScrollView } from "react-native";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromBeginningOfYear } from "../utils/generate-dates-from-beginning-of-year";

import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromBeginningOfYear = generateDatesFromBeginningOfYear();

const minimumAmountOfTiles = 5 * 18 + 1;
const amountOfTilesToFill =
  minimumAmountOfTiles - datesFromBeginningOfYear.length;

export function Home() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((day, index) => (
          <Text
            key={`${day}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{
              width: DAY_SIZE,
            }}
          >
            {day}
          </Text>
        ))}
      </View>
      <ScrollView>
        <View className="flex-row flex-wrap pb-16">
          {datesFromBeginningOfYear.map((date, i) => (
            <HabitDay
              i={i}
              key={date.toString()}
              onPress={() =>
                navigate("habit", {
                  date: date.toISOString(),
                })
              }
              habitsCompleted={Math.round(Math.random() * 6)}
              maxHabits={5}
              isToday={dayjs(date).format("DD/MM") === dayjs().format("DD/MM")}
            />
          ))}

          {amountOfTilesToFill > 0 &&
            Array.from({ length: amountOfTilesToFill }).map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{
                  width: DAY_SIZE,
                  height: DAY_SIZE,
                }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
