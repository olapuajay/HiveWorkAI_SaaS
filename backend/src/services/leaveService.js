export const calculateLeaveDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  return diff + 1;
};
