export const getWeekDateRange = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const numDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const startOfWeek = new Date(now.setDate(now.getDate() - numDay));
  const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

  const formatDate = (date) => date.toISOString().split('T')[0];

  return {
    fromDate: formatDate(startOfWeek),
    toDate: formatDate(endOfWeek),
  };
};
