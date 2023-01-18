import { generateDatesFromBegginingOfYear } from "../utils/generate-dates-from-beginning-of-year";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromBegginingOfYear();

const minimumSummaryTiles = 18 * 7;

const missingTiles = minimumSummaryTiles - summaryDates.length;

export function SummaryTable() {
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
        {summaryDates.map((date, index) => {
          return <HabitDay key={date.toString()} />;
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
