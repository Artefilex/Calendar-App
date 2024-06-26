import { useState } from "react";
import CalendarLayouth from "../layouts/CalendarLayouth";
import DayCalendar from "./DayCalendar";
import YearCalendar from "./YearCalendar";
import MonthCalendar from "./MonthCalendar";
import { useSelector } from "react-redux";
function MyCalendar() {
  const {change} = useSelector((state)=> state.CalanderReducer)
  switch (change) {
    case "day":
      return (
        <CalendarLayouth >
          <DayCalendar />
        </CalendarLayouth>
      );
    case "month":
      return (
        <CalendarLayouth>
          <MonthCalendar />
        </CalendarLayouth>
      );
    case "year":
      return (
        <CalendarLayouth>
          <YearCalendar />
        </CalendarLayouth>
      );
  }
}

export default MyCalendar;
