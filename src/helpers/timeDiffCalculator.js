export function calculateTimeDifference(startDate, endDate) {
  const [startHours, startMinutes] = startDate.split(":").map(Number);
  const [endHours, endMinutes] = endDate.split(":").map(Number);

  const start = new Date();
  const end = new Date();

  start.setHours(startHours, startMinutes, 0);
  end.setHours(endHours, endMinutes, 0);

  const diff = end - start; 
  const diffMinutes = diff / (1000 * 60);

  return diffMinutes;
}