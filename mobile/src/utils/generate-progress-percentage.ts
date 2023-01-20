export function generateProgressPercentage(
  total: number,
  completed: number
): {
  percentage: number;
  percentageInDecimals: number;
} {
  if (total === 0) {
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
