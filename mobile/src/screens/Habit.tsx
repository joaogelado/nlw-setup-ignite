import { View, Text, ScrollView, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import clsx from "clsx";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Loading } from "../components/Loading";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { EmptyHabitList } from "../components/EmptyHabitList";
import colors from "tailwindcss/colors";
interface Params {
  date: string;
}

interface HabitInfo {
  possibleHabits: { id: string; title: string; createdAt: string }[];
  completedHabits: string[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [habitInfo, setHabitInfo] = useState<HabitInfo>();
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf("day").isBefore(dayjs(), "day");
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const { percentage, percentageInDecimals } = generateProgressPercentage(
    habitInfo?.possibleHabits.length,
    completedHabits.length
  );

  const sharedPercentage = useSharedValue(percentage);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      color: `${
        sharedPercentage.value === 100 ? colors.violet[500] : colors.zinc[500]
      }`,
    };
  });

  useEffect(() => {
    sharedPercentage.value = withDelay(100, withTiming(percentage));
  }, [percentage]);

  async function handleToggleHabit(id: string) {
    const isCompletingHabit = completedHabits.includes(id);

    if (isCompletingHabit) {
      setCompletedHabits((oldState) =>
        oldState.filter((habit) => habit !== id)
      );
    } else {
      setCompletedHabits((oldState) => [...oldState, id]);
    }
    try {
      api.patch(`/habits/${id}/toggle`);
    } catch (error) {
      console.error(error);

      if (!isCompletingHabit) {
        setCompletedHabits((oldState) =>
          oldState.filter((habit) => habit !== id)
        );
      } else {
        setCompletedHabits((oldState) => [...oldState, id]);
      }

      Alert.alert(
        "Ops...",
        "Não foi possível atualizar o hábito :( \n Todas as mudanças serão desfeitas."
      );
    }
  }

  async function fetchHabits() {
    try {
      setLoading(true);

      const response = await api.get("/day", {
        params: {
          date,
        },
      });

      setHabitInfo({
        possibleHabits: response.data.possibleHabits,
        completedHabits: response.data.completedHabits,
      });
      setCompletedHabits(response.data.completedHabits);
    } catch (error) {
      console.error(error);

      setHabitInfo({
        possibleHabits: [],
        completedHabits: [],
      });

      Alert.alert("Ops...", "Não foi possível carregar os hábitos. :(");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <>
      <View className="flex-1 bg-background px-8 pt-16">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 16,
          }}
        >
          <BackButton />

          <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
            {dayOfWeek}
          </Text>
          <Text className="text-white font-extrabold text-5xl mt-2">
            {dayAndMonth}
          </Text>
          {!loading ? (
            <>
              <ProgressBar progress={percentage} />
              <Animated.Text
                className={"w-full text-right font-semibold text-base"}
                style={animatedStyle}
              >
                {percentage}%
              </Animated.Text>

              <View
                className={clsx("mt-6", {
                  "opacity-50": isDateInPast,
                })}
              >
                {habitInfo!.possibleHabits.length > 0 ? (
                  habitInfo!.possibleHabits.map((habit) => (
                    <Checkbox
                      title={habit.title}
                      checked={completedHabits.includes(habit.id)}
                      disabled={isDateInPast}
                      onPress={() => handleToggleHabit(habit.id)}
                      key={habit.id}
                    />
                  ))
                ) : (
                  <EmptyHabitList />
                )}
              </View>

              {isDateInPast && (
                <View>
                  <Text className="text-zinc-500 font-semibold text-base  mt-10 text-center">
                    Você não pode{" "}
                  </Text>
                  <Text className="line-through text-sm text-zinc-700 text-center">
                    ser um viajante do tempo{" "}
                  </Text>
                  <Text className="text-zinc-500 font-semibold text-base text-center">
                    alterar hábitos de dias passados
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View className="mt-6">
              <Loading />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}
