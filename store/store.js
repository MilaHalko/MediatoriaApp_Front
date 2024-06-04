import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { reviewReducer } from "./slices/reviewSlice";
import {movieReducer} from "./slices/movieSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        reviews: reviewReducer,
        movies: movieReducer
    }
});

export default store;
