import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchReviewsByMovieId = createAsyncThunk('reviews/fetchReviewsByMovieId', async (movieId, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/reviews/movie/${movieId}`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchReview = createAsyncThunk('reviews/fetchReview', async (id, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`/review/${id}`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const createReview = createAsyncThunk('reviews/createReview', async ({text, rating, movieId}, {rejectWithValue}) => {
    try {
        const {data} = await axios.post('/review', {text, rating, movieId});
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const deleteReview = createAsyncThunk('reviews/deleteReview', async (id, {rejectWithValue}) => {
    try {
        const {data} = await axios.delete(`/review/${id}`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const likeReview = createAsyncThunk('reviews/likeReview', async (id, {rejectWithValue}) => {
    try {
        const {data} = await axios.post(`/review/${id}/like`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const unlikeReview = createAsyncThunk('reviews/unlikeReview', async (id, {rejectWithValue}) => {
    try {
        const {data} = await axios.post(`/review/${id}/unlike`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

const initialState = {
    reviews: [],
    review: null,
    status: 'idle',
    error: null
};

const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ALL MOVIE REVIEWS
            .addCase(fetchReviewsByMovieId.pending, (state) => {
                state.reviews = [];
                state.status = 'loading';
            })
            .addCase(fetchReviewsByMovieId.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchReviewsByMovieId.rejected, (state, action) => {
                state.reviews = [];
                state.status = 'failed';
                state.error = action.payload;
            })

            // SINGLE REVIEW
            .addCase(fetchReview.pending, (state) => {
                state.review = null;
                state.status = 'loading';
            })
            .addCase(fetchReview.fulfilled, (state, action) => {
                state.review = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchReview.rejected, (state, action) => {
                state.review = null;
                state.status = 'failed';
                state.error = action.payload;
            })

            // CREATE REVIEW
            .addCase(createReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createReview.fulfilled, (state, action) => {
                console.log('Review in fetch:', action.payload)
                state.reviews.push(action.payload);
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // DELETE REVIEW
            .addCase(deleteReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(review => review._id !== action.meta.arg);
                state.status = 'succeeded';
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // LIKE REVIEW
            .addCase(likeReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(likeReview.fulfilled, (state, action) => {
                const index = state.reviews.findIndex(review => review._id === action.payload._id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
                state.status = 'succeeded';
            })
            .addCase(likeReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // UNLIKE REVIEW
            .addCase(unlikeReview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(unlikeReview.fulfilled, (state, action) => {
                const index = state.reviews.findIndex(review => review._id === action.payload._id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
                state.status = 'succeeded';
            })
            .addCase(unlikeReview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const selectAllReviews = (state) => state.reviews.reviews;
export const selectReviewById = (state, reviewId) => state.reviews.reviews.find(review => review._id === reviewId);
export const reviewReducer = reviewSlice.reducer;
