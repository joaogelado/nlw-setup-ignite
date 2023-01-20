import { View, Text, ScrollView, Alert } from "react-native";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromBeginningOfYear } from "../utils/generate-dates-from-beginning-of-year";

import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

import { AxiosError } from "axios";
import { Loading } from "../components/Loading";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const datesFromBeginningOfYear = generateDatesFromBeginningOfYear();

const minimumAmountOfTiles = 5 * 18 + 1;
const amountOfTilesToFill =
  minimumAmountOfTiles - datesFromBeginningOfYear.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Summary>([]);

  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/summary");

      setSummary(response.data.summary);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.toJSON());
        Alert.alert("Ops...", "Ocorreu um erro ao buscar os dados.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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

      {loading && <Loading />}

      {!loading && summary && (
        <ScrollView>
          <View className="flex-row flex-wrap pb-16">
            {datesFromBeginningOfYear.map((date) => {
              const dayWithHabit = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });

              return (
                <HabitDay
                  date={date}
                  key={date.toString()}
                  onPress={() =>
                    navigate("habit", {
                      date: date.toISOString(),
                    })
                  }
                  habitsCompleted={dayWithHabit?.completed}
                  maxHabits={dayWithHabit?.amount}
                />
              );
            })}

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
      )}
    </View>
  );
}
