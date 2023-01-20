import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function toggleWeekDay(day: number) {
    if (weekDays.includes(day)) {
      const weekDaysWithoutDay = weekDays.filter((weekDay) => weekDay !== day);

      setWeekDays(weekDaysWithoutDay);
    } else {
      const weekDaysWithDay = [...weekDays, day];

      setWeekDays(weekDaysWithDay);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title) return;
    if (weekDays.length === 0) return;

    await api.post("/habits", {
      title,
      weekDays,
    });

    setTitle("");
    const emptyWeekDays: number[] = [];

    setWeekDays(emptyWeekDays);

    // TODO: implement radix-ui toast
    alert("Hábito cadastrado com sucesso!");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col mt-6">
      <label htmlFor="habit-title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="habit-title"
        placeholder="Ex.: Exercícios, dormir bem, beber 2L de água..."
        className="p-4 rounded-lg mt-3 outline-none bg-zinc-800 text-white placeholder:text-zinc-500"
        autoFocus
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((day, index) => (
          <Checkbox.Root
            className="flex items-center gap-3 group"
            key={day}
            checked={weekDays.includes(index)}
            onCheckedChange={() => toggleWeekDay(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:border-green-400 group-data-[state=checked]:bg-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className=" text-zinc-400 leading-tight  group-data-[state=checked]:text-zinc-50">
              {day}
            </span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center disabled:cursor-not-allowed justify-center gap-3 font-semibold bg-green-600 enabled:hover:bg-green-500 transition-colors ease-in-out disabled:opacity-40"
        disabled={weekDays.length === 0 || !title}
      >
        <Check weight="bold" />{" "}
        {weekDays.length === 0 || !title
          ? "Preencha todas as informações"
          : "Confirmar"}
      </button>
    </form>
  );
}
