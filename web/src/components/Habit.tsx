import { PropsWithChildren } from "react";

type HabitProps = PropsWithChildren<{
  completions: number;
  maxCompletions: number;
}>;

export default function Habit({ completions, maxCompletions }: HabitProps) {
  return (
    <h1 className="bg-zinc-800 w-10 h-10 text-white rounded m-2 flex items-center justify-center">
      {completions}
    </h1>
  );
}
