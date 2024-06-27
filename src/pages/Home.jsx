import { Link } from "react-router-dom";

function Home() {
  const time = {
    day: new Date().getUTCDate(),
    month: new Date().getMonth() +1,
    year : new Date().getFullYear()
  }
  return <div className="flex items-center justify-center w-full px-2 py-2 bg-slate-900 min-h-screen">
    <div className="flex items-center justify-center w-full  max-w-[1200px] ">
     <Link className="text-white" to={`/calendar/${time.day}/${time.month}/${time.year}`}>Go to Calendar</Link>
    </div>
  </div>;
}

export default Home;
