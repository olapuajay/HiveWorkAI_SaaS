export const calculateLeaveDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

  const diff =
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  return Math.floor(diff) + 1;
};
