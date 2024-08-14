export function useCalculateYearsFromDate(date: string) {
  const calculate = () => {
    const startWorking = new Date(date).getTime();
    const today = new Date().getTime();
    const diffInMs: number = today - startWorking;
    const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;
    return Math.round((diffInMs / MS_PER_YEAR) * 2) / 2;
  };

  return calculate();
}
