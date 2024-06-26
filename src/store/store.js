import { configureStore } from "@reduxjs/toolkit";
import CalanderReducer from "./CalanderSlice";
const store = configureStore({
    reducer:{
         CalanderReducer 
    }})


export default store 