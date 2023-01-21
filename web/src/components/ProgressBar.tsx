interface ProgressBarProps {
  progressInPercentage: number;
}

export function ProgressBar({ progressInPercentage }: ProgressBarProps) {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div
        role={"progressbar"}
        className="h-3 rounded-xl bg-violet-600 w-3/4 transition-all duration-300 ease-in-out"
        aria-label="Progresso do dia"
        aria-valuenow={progressInPercentage}
        style={{ width: `${progressInPercentage}%` }}
      ></div>
    </div>
  );
}
