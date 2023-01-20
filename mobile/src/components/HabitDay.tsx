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
  habitsCompleted?: number;
  maxHabits?: number;
  date: Date;
}

import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import dayjs from "dayjs";

export function HabitDay({
  habitsCompleted = 0,
  maxHabits = 0,
  date,
  ...rest
}: HabitDayProps) {
  const { percentage } = generateProgressPercentage(maxHabits, habitsCompleted);

  const isToday = dayjs(date).isSame(dayjs(), "day");

  console.log(percentage);

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"]: percentage == 0,
        ["bg-violet-900 border-violet-700"]: percentage > 0 && percentage < 20,
        ["bg-violet-800 border-violet-600"]:
          percentage >= 20 && percentage < 40,
        ["bg-violet-700 border-violet-500"]:
          percentage >= 40 && percentage < 60,
        ["bg-violet-600 border-violet-400"]:
          percentage >= 60 && percentage < 80,
        ["bg-violet-500 border-violet-300"]: percentage >= 80,
        ["border-violet-100 border-4"]: isToday,
      })}
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE,
      }}
      activeOpacity={0.6}
      {...rest}
    ></TouchableOpacity>
  );
}
