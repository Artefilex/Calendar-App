import { createSlice } from "@reduxjs/toolkit";


const initialState = {
   change : "day",
  userEvents: JSON.parse(localStorage.getItem("userEvent")) || [],
   currentDate: null
}


const CalanderData = createSlice({
    name: "CalanderData",
    initialState,
    reducers:{
        calanderFormatCahnger : (state, action) =>{
            state.change = action.payload
        },
        calanderUserEvents : (state , action) =>{
          state.userEvents.push(action.payload);   
          localStorage.setItem("userEvent", JSON.stringify(state.userEvents));
        },
        currentDateChange : (state ,action) =>{
          state.currentDate  = action.payload         
        }
    }
})

export const {calanderFormatCahnger ,calanderUserEvents , currentDateChange} = CalanderData.actions

export default CalanderData.reducer