import logoImage from "../assets/logo.svg";
import * as Dialog from "@radix-ui/react-dialog";

import { Plus, X } from "phosphor-react";
import { useState } from "react";
import { NewHabitForm } from "./NewHabitForm";

export function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img
        src={logoImage}
        alt="Habits logo"
        className="hover:animate-wiggle p-3 rounded-lg"
      />

      <Dialog.Root>
        <Dialog.Trigger
          type="button"
          className="focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background border group border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:bg-violet-500 hover:text-white transition-colors duration-300"
        >
          <Plus
            size={20}
            className="text-violet-500 group-hover:text-white transition-colors duration-300"
          />
          Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen fixed bg-black/70 inset-0 backdrop-blur-sm transition ease-in-out" />
          <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Dialog.Close className="absolute rounded-lg right-6 top-6 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
              <X size={24} aria-lable="Fechar" />
            </Dialog.Close>
            <Dialog.Title className="text-3xl font-extrabold leading-tight">
              Criar hábito
            </Dialog.Title>

            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
