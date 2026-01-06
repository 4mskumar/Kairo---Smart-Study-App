// Get normalized Monday 00:00 as week start
export const getWeekStart = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // shift to Monday
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0); // normalize
  return weekStart;
};
