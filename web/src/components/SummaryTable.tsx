import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromBeginningOfYear } from "../utils/generate-dates-from-beginning-of-year";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromBeginningOfYear();

const minimumSummaryTiles = 18 * 7;

const missingTiles = minimumSummaryTiles - summaryDates.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data.summary);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => {
          return (
            <div
              key={`${day}-${index}`}
              className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date, index) => {
            const dayInSummary = summary.find((day) =>
              dayjs(date).isSame(day.date, "day")
            );

            return (
              <HabitDay
                key={date.toString()}
                isToday={index + 1 == summaryDates.length}
                date={date}
                defaultHabitsCompleted={dayInSummary?.completed}
                maxHabits={dayInSummary?.amount}
              />
            );
          })}
        {missingTiles > 0 &&
          Array.from({ length: missingTiles }).map((_, index) => {
            return (
              <div
                key={index}
                className="h-10 w-10 bg-zinc-900 border-2 border-zinc-800 opacity-40 cursor-not-allowed rounded-lg"
              />
            );
          })}
      </div>
    </div>
  );
}
