import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import MyCalendar from './pages/Calendar';

function App() {
  return (
    <Router>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/calendar/:dayid/:monthid/:yearid' element={<MyCalendar/>}/>
      {/* <Route path='/calendar/:dayid/:monthid/:yearid' element={<NestedCalender/>}/> */}
     </Routes>      
    </Router>
  )
}

export default App
