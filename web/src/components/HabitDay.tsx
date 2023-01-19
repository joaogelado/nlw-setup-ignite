import { PropsWithChildren, useEffect, useState } from "react";

import clsx from "clsx";

import * as Popover from "@radix-ui/react-popover";
import { ProgressBar } from "./ProgressBar";

type HabitProps = PropsWithChildren<{
  isToday?: boolean;
  habitsCompleted: number;
  maxHabits: number;
}>;

export function HabitDay({ isToday, habitsCompleted, maxHabits }: HabitProps) {
  const percentageInDecimals =
    Math.round((habitsCompleted / maxHabits) * 100) / 100;
  const percentage = Math.round((habitsCompleted / maxHabits) * 100);

  // Old aproach

  // let shade = "bg-zinc-900 border-zinc-800";

  // if (percentageInDecimals == 1) {
  //   shade = "bg-violet-500 border-violet-300";
  // } else if (percentageInDecimals > 0.8) {
  //   shade = "bg-violet-600 border-violet-400";
  // } else if (percentageInDecimals > 0.6) {
  //   shade = "bg-violet-700 border-violet-500";
  // } else if (percentageInDecimals > 0.4) {
  //   shade = "bg-violet-800 border-violet-600";
  // } else if (percentageInDecimals > 0.2) {
  //   shade = "bg-violet-900 border-violet-700";
  // } else {
  //   shade = "bg-zinc-900 border-zinc-800";
  // }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          `h-10 w-10 border-2 rounded-lg hover:opacity-80 hover:border-white hover:border-4 transition ease-in-out duration-300 focus:border-white focus:border-4 focus:outline-none`,
          {
            "border-4": isToday,
          },
          {
            "bg-violet-500 border-violet-300": percentageInDecimals == 1,
            "bg-violet-600 border-violet-400":
              percentageInDecimals >= 0.8 && percentageInDecimals < 1,
            "bg-violet-700 border-violet-500":
              percentageInDecimals >= 0.6 && percentageInDecimals < 0.8,
            "bg-violet-800 border-violet-600":
              percentageInDecimals >= 0.4 && percentageInDecimals < 0.6,
            "bg-violet-900 border-violet-700":
              percentageInDecimals >= 0.2 && percentageInDecimals < 0.4,
            "bg-zinc-900 border-zinc-800": percentageInDecimals == 0,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">quinta-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            19/01
          </span>

          <ProgressBar progressInPercentage={percentage} />
          <span
            className={clsx(
              `text-right font-semibold duration-700 transition`,
              {
                "text-violet-500": percentageInDecimals == 1,
                "text-zinc-500": percentageInDecimals < 1,
              }
            )}
          >
            {percentage}%
          </span>

          <Popover.Arrow className="fill-zinc-900" height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
