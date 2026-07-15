import { isSwedishHoliday }
  from "./isSwedishHoliday.js";

export function getDayHeaderClass(
  date,
  index
) {

  if (index === 6) {
    return "sunday-header";
  }

  if (
    isSwedishHoliday(date)
  ) {
    return "holiday-header";
  }

  return "";

}