import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return <div className="flex items-center justify-center w-full px-2 py-2 bg-slate-900 min-h-screen">
    <div className="flex items-center justify-center w-full  max-w-[1200px] ">
     <Link className="text-white" to={"/calendar"}>Go to Calendar</Link>
    </div>
  </div>;
}

export default Home;
