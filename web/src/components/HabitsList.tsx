import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitsListProps {
  date: Date;
  onAmountCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    createdAt: string;
  }[];
  completedHabits: string[];
}

export function HabitsList({
  date,
  onAmountCompletedChanged,
}: HabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  const isDateInPast = dayjs(date).endOf("day").isBefore(new Date());

  async function handleCheckboxToggle(habitId: string) {
    const isHabitCompletedAlreadyCompleted =
      habitsInfo!.completedHabits.includes(habitId);

    await api.patch(`/habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitCompletedAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(
        (id) => id !== habitId
      );
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onAmountCompletedChanged(completedHabits.length);
  }

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => {
        const { possibleHabits, completedHabits } = response.data as HabitsInfo;

        const habitsInfo = {
          possibleHabits,
          completedHabits,
        };

        setHabitsInfo(habitsInfo);
      });
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => (
        <Checkbox.Root
          className="flex items-center disabled:cursor-not-allowed gap-3 group focus:outline-none"
          key={habit.id}
          onCheckedChange={() => handleCheckboxToggle(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
        >
          <div className="h-8 w-8 group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background rounded-lg flex transition-colors items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:border-green-400 group-data-[state=checked]:bg-green-500">
            <Checkbox.Indicator>
              <Check
                size={20}
                className="text-transparent group-data-[state=checked]:text-white transition-colors"
              />
            </Checkbox.Indicator>
          </div>
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
