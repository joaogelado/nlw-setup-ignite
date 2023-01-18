import logoImage from "../assets/logo.svg";

import { Plus } from "phosphor-react";

export function Header() {
  return (
    <header className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={logoImage} alt="Habits logo" />{" "}
      <button
        type="button"
        className="border group border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:bg-violet-500 hover:text-white transition-colors duration-300"
      >
        <Plus
          size={20}
          className="text-violet-500 group-hover:text-white transition-colors duration-300"
        />
        Novo hábito
      </button>
    </header>
  );
}
