import { useDispatch, useSelector } from "react-redux";
import { hours } from "../data/dates";
import { calanderUserEvents } from "../store/CalanderSlice";
import { useEffect, useState } from "react";

function DayCalendar() {
  const [todayEvents, setTodayEvents] = useState(null)
   const { currentDate } = useSelector((state) => state.CalanderReducer);
  const {userEvents} = useSelector(state => state.CalanderReducer)
  const [form, setForm] = useState({
      startDate:"",
      endDate:"",
      activite: "",
  });
  const [toggle , setToggle] =  useState(false)


  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("userEvent")) || [];
    const userBlaBla = storedEvents.filter(element => {
      if (!element.date || typeof element.date !== 'object') return false;
      const eventDate = new Date(element.date.year, element.date.month - 1, element.date.day);
      const current = new Date(currentDate?.year, currentDate?.month - 1, currentDate?.day);
      return current.getDate() === eventDate.getDate() &&
             current.getMonth() === eventDate.getMonth() &&
             current.getFullYear() === eventDate.getFullYear();
    });
   setTodayEvents(userBlaBla)
   
  }, [currentDate ,userEvents ]);

 
  const dispatch = useDispatch();
  const filteredEndHours = hours.filter(
    (hour) => !form.startDate || hour > form.startDate
  );

  const handelChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const handleCurrentEvent = (e) => {
    e.preventDefault();
    const endDate = form.endDate || filteredEndHours[0]; // Eğer endDate seçilmemişse, filteredEndHours[0]'ı kullan
    dispatch(calanderUserEvents({ date: currentDate, userEvent: { ...form, endDate } }));
    setForm((prevForm) =>(
      { ...prevForm,
        activite: ""
      }
    ));
  };
 

 
  return (
    <div className="relative w-full">
  <div onClick={()=>setToggle(!toggle)} className="w-full pt-3 pl-2 flex flex-col gap-2 ">
   {hours.map((d, index) => {
    if (index % 4 === 0) {
      return (
        <div key={index} className="h-[40px] gap-4 flex flex-row items-center w-full ">
         <div className="text-[10px]">{d}</div> <div  className="w-full h-[2px] bg-black/15" />
        </div>
      );
    } else {
      return null;
    }
  })}
 
    </div>
    { toggle  && <div  style={{ left: `calc(50% - 125px)` }}
    className="bg-black/85 text-white w-[250px] h-[300px] rounded-md text-xl font-bold absolute top-0">
        Selected Event
      
          <form onSubmit={handleCurrentEvent}>
          <div>
            <select name="startDate" onChange={handelChange}>
              {hours.map((d, index) => ( <option value={d} key={index} className="mt-2 border-b-2"> {d}  </option> ))}
            </select>
            <select name="endDate"  value={form.endDate} onChange={handelChange} >
              {filteredEndHours.map((d, index) => (  <option value={d} key={index}  className="mt-2 border-b-2">  {d}  </option> ))}
            </select>
          </div>
          <input type="text" value={form.activite} name="activite" onChange={handelChange} placeholder="Add Title"  />
          <button type="submit"> Save </button>
        </form>
      
      </div>}
    </div>
  
  );
}

export default DayCalendar;
