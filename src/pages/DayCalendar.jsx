import { useDispatch, useSelector } from "react-redux";
import { hours } from "../data/dates";
import { calanderUserEvents } from "../store/CalanderSlice";
import { useEffect, useState } from "react";
import { calculateTimeDifference } from "../helpers/timeDiffCalculator";
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
  const dispatch = useDispatch();

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

  const handleHourClick = (hour) => {
    if(hour){
      setForm((prevForm) => ({
        ...prevForm,
        startDate: hour,
        endDate: filteredEndHours.find((h) => h > hour) || hour,
      }));
    }

  };
  
 
 

  const filteredEndHours = hours.filter(
    (hour) => !form.startDate || hour > form.startDate
  );
  const filterStartHours = hours.filter(
    (hour) => !form.startDate || hour >= form.startDate
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
 
console.log(todayEvents);
  return (
    <div className="relative w-full">
  <div id="scrollableDiv"
        onClick={()=>setToggle(!toggle)} className="w-full mt-3 pl-2 flex flex-col gap-2 ">
        
   {hours.map((d, index) => {
    if (index % 4 === 0) {
      
      return (
        <div key={index} className="h-[52px] gap-4 flex flex-row items-start w-full " onClick={() => handleHourClick(d)}>
         <div className="text-[12px]">{d}</div> <div className="w-full">
         <div  className="w-full h-[2px] bg-black/15" />
       <div >
       <div className="w-full relative">
       { todayEvents &&  todayEvents.filter((today)=> today.userEvent.startDate === d).map((s , i ) => (
           <div  key={i} style={{height:`${calculateTimeDifference(s.userEvent.startDate, s.userEvent.endDate)}px` }}  className=" w-full bg-blue-500 rounded-md px-2 py-2 font-semibold text-white text-lg">({s.userEvent.startDate} - {s.userEvent.endDate}) {s?.userEvent?.activite}</div>
         ))
         }
       </div>
       </div>
         </div>
        </div>
      );
    } else {
      return null;
    }
  })}
 
    </div>
    { toggle  && <div  style={{ left: `calc(50% - 125px)` }}
    className="bg-white  w-[250px] h-[300px] rounded-md text-xl  fixed top-20 border-2 shadow-xl px-4 py-4">
          <form className="w-full h-full flex flex-col gap-4 relative" onSubmit={handleCurrentEvent}>
          <input className="border-b-2 outline-none border-blue-900" type="text" value={form.activite} name="activite" onChange={handelChange} placeholder="Add Title"  />
          <div className="text-slate-400">Select Date </div>
          <div className="flex gap-2">
            <select className="border-none outline-none" name="startDate" onChange={handelChange}>
              {/* {form.startDate 
              ? 
              filterStartHours.map((d, index) => ( <option value={d} key={index} className="mt-4"> {d}  </option> ))  
              :
               hours.map((d, index) => ( <option value={d} key={index} className="mt-4"> {d}  </option> ))} */}
                  { hours.map((d, index) => ( <option 
                  value={ d}

                   key={index} className="mt-4"> {form.startDate ? form.startDate : d} </option> ))}
            </select>
            -
            <select className="border-none outline-none" name="endDate"  value={form.endDate} onChange={handelChange} >
              {filteredEndHours.map((d, index) => (  <option value={d} key={index}  className="mt-2 border-b-2">  {d}  </option> ))}
            </select>
          </div>
          
          <button  className="absolute bg-blue-700 rounded-[8px] py-1 px-5 bottom-0 text-[16px] font-semibold text-white right-0" type="submit"> Save </button>
        </form>
      
      </div>}
    </div>
  
  );
}

export default DayCalendar;
