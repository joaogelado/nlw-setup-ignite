import { View, Text, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";

import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import clsx from "clsx";
import { Checkbox } from "../components/Checkbox";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const max = 5;
  const variable = Math.round(Math.random() * (max + 1));
  const percentage = Math.round((variable / max) * 100);
  const percentageInDecimals = percentage / 100;

  return (
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
        <ProgressBar progress={percentage} />
        <Text
          className={clsx("w-full text-right font-semibold text-base", {
            "text-violet-500": percentageInDecimals == 1,
            "text-zinc-500": percentageInDecimals < 1,
          })}
        >
          {percentage}%
        </Text>

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" checked={true} />
          <Checkbox title="Caminhar todo dia" checked={false} />
        </View>
      </ScrollView>
    </View>
  );
}
