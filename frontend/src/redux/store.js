import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; // Correct import path
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

const store = configureStore({
    reducer: {
        auth: authSlice, // Add the `authSlice` reducer
        job: jobSlice,
        company: companySlice,
        application: applicationSlice,
    },
});

export default store;
