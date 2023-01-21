export function generateProgressPercentage(
  total: number | undefined,
  completed: number | undefined
): {
  percentage: number;
  percentageInDecimals: number;
} {
  if (!total || !completed) {
    return {
      percentage: 0,
      percentageInDecimals: 0,
    };
  }

  return {
    percentage: Math.round((completed / total) * 100),
    percentageInDecimals: Math.round((completed / total) * 100) / 100,
  };
}
