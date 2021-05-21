import { isToday, format, isWithinInterval, add, isThisYear } from "date-fns";

export const formatDate = (date: Date) => {
  if (isToday(date)) {
    // today return time
    return format(date, "h:mm a");
  } else if (
    isWithinInterval(date, {
      start: new Date(),
      end: add(new Date(), { days: 6 }),
    })
  ) {
    // this week return day of week and time
    return format(date, "E h:mm a");
  } else if (isThisYear(date)) {
    // this year return month day time
    return format(date, "MMM d h:mm a");
  } else {
    // return year month day time
    return format(date, "MMM d, y h:mm a");
  }
};
