import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from "react-native";

import clsx from "clsx";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL_PADDING + 5);

interface HabitDayProps extends TouchableOpacityProps {
  habitsCompleted: number;
  maxHabits: number;
  isToday?: boolean;
  i: number;
}

export function HabitDay({
  habitsCompleted,
  maxHabits,
  isToday = false,
  i,
  ...rest
}: HabitDayProps) {
  const percentageInDecimals =
    Math.round((habitsCompleted / maxHabits) * 100) / 100;

  let shade = "bg-zinc-900 border-zinc-800";

  if (percentageInDecimals == 1) {
    shade = "bg-violet-500 border-violet-300";
  } else if (percentageInDecimals > 0.8) {
    shade = "bg-violet-600 border-violet-400";
  } else if (percentageInDecimals > 0.6) {
    shade = "bg-violet-700 border-violet-500";
  } else if (percentageInDecimals > 0.4) {
    shade = "bg-violet-800 border-violet-600";
  } else if (percentageInDecimals > 0.2) {
    shade = "bg-violet-900 border-violet-700";
  }

  return (
    <TouchableOpacity
      className={`rounded-lg m-1 ${shade} ${
        isToday ? "border-4" : "border-2"
      } `}
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE,
      }}
      activeOpacity={0.6}
      {...rest}
    ></TouchableOpacity>
  );
}
