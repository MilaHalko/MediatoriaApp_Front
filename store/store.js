import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { reviewReducer } from "./slices/reviewSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        reviews: reviewReducer
    }
});

export default store;
