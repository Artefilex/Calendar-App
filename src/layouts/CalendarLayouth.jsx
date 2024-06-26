import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { months } from "../data/dates";
import { throttle } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calanderFormatCahnger , currentDateChange} from "../store/CalanderSlice";
import PropTypes from "prop-types"
function CalendarLayouth({ children }) {
  const { change } = useSelector((state) => state.CalanderReducer);
  const [update, setUpdate] = useState(false);
  const [date, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    dayOfMonth: new Date().getDate(),
    daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const days = getDaysInMonth(month, year);
    setDate((prevDate) => ({
      ...prevDate,
      daysInMonth: days,
    }));
  }, []);

  useEffect(() => {
    if (update) {
      navigate(`/calendar/${date.dayOfMonth}/${date.month + 1}/${date.year}`);
      dispatch(currentDateChange({ day : date.dayOfMonth ,month:  date.month , year:  date.year}))
    }
  }, [update, date.dayOfMonth, date.month, date.year, navigate ,dispatch]);

  useEffect(() => {
    setUpdate(true);
    const handleWheel = throttle((event) => {
      if (change === "month") {
        setDate((prevDate) => {
          let newMonth = event.deltaY < 0 ? prevDate.month + 1 : prevDate.month - 1;
          let newYear = prevDate.year;

          if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
          } else if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
          }

          const daysInMonth = getDaysInMonth(newMonth, newYear);

          return {
            ...prevDate,
            month: newMonth,
            year: newYear,
            daysInMonth: daysInMonth,
          };
        });
      }
    }, 400);

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      setUpdate(false);
    };
  }, [change]);

  const handleDecrease = () => {
    if (change === "day") {
      setDate((prevDate) => {
        let newDay = prevDate.dayOfMonth - 1;
        let newMonth = prevDate.month;
        let newYear = prevDate.year;

        if (newDay < 1) {
          newMonth = prevDate.month === 0 ? 11 : prevDate.month - 1;
          newYear = prevDate.month === 0 ? prevDate.year - 1 : prevDate.year;
          newDay = getDaysInMonth(newMonth, newYear);
        }

        return {
          ...prevDate,
          dayOfMonth: newDay,
          month: newMonth,
          year: newYear,
        };
      });
    } else if ( change === "year"){
      setDate((prevDate) =>{
     return {
        ...prevDate,
        year : prevDate.year - 1}
      })
    }
  };

  const handleIncrease = () => {
    if (change === "day") {
      setDate((prevDate) => {
        let newDay = prevDate.dayOfMonth + 1;
        let newMonth = prevDate.month;
        let newYear = prevDate.year;

        if (newDay > prevDate.daysInMonth) {
          newDay = 1;
          newMonth = prevDate.month === 11 ? 0 : prevDate.month + 1;
          newYear = prevDate.month === 11 ? prevDate.year + 1 : prevDate.year;
        }

        return {
          ...prevDate,
          dayOfMonth: newDay,
          month: newMonth,
          year: newYear,
          daysInMonth: getDaysInMonth(newMonth, newYear),
        };
      });
    }else if ( change === "year"){
      setDate((prevDate) =>{
     return {
        ...prevDate,
        year : prevDate.year + 1}
      })
    }
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="flex flex-col gap-2 items-center mt-2">
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-row gap-2 max-w-[300px] w-full">
            <div className="bg-slate-200">
              {date.dayOfMonth} - {months[date.month]} - {date.year}
            </div>
          </div>
          <div>
            <button onClick={handleDecrease}>
              <IoIosArrowBack />
            </button>
            <button onClick={handleIncrease}>
              <IoIosArrowForward />
            </button>
          </div>
          <select
            name=""
            id=""
            defaultValue={"day"}
            onChange={(e) => dispatch(calanderFormatCahnger(e.target.value))}
          >
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      {children}
    </div>
  );
}

CalendarLayouth.propTypes = {
  children : PropTypes.node
}

export default CalendarLayouth;
