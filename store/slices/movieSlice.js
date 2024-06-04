import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id, { rejectWithValue }) => {
    console.log('fetchMovieById:', id)
    try {
        const { data } = await axios.get(`/movies/${id}`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchMovieByName = createAsyncThunk('movies/fetchMovieByName', async (name, { rejectWithValue }) => {
    console.log('fetchMovieByName:', name)
    try {
        const { data } = await axios.get(`/movies/name/${name}`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchFavoriteMovies = createAsyncThunk('movies/fetchFavoriteMovies', async (_, { rejectWithValue }) => {
    console.log('fetchFavoriteMovies...')
    try {
        const { data } = await axios.get('/movies/user/favorites');
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchMoviesByRequest = createAsyncThunk('movies/fetchMoviesByRequest', async ({ query, movieCount }, { rejectWithValue }) => {
    console.log('fetchMoviesByRequest:', query, movieCount)
    try {
        const { data } = await axios.post('/movies/request', { query, movieCount });
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchLikeToggle = createAsyncThunk('movies/fetchLikeToggle', async ({ tmdbMovieId, isLiked }, { rejectWithValue }) => {
    console.log('fetchLikeToggle:', tmdbMovieId, isLiked ? 'like' : 'dislike', 'to', !isLiked ? 'like' : 'dislike')
    try {
        const { data } = await axios.post('/movies/like-toggle', { tmdbMovieId, isLiked });
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchMovieTrailer = createAsyncThunk('movies/fetchMovieTrailer', async (id, { rejectWithValue }) => {
    console.log('fetchMovieTrailer:', id)
    try {
        const { data } = await axios.get(`/movies/${id}/trailer`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

const initialState = {
    movies: [],
    favoriteMovies: [],
    movie: null,
    movieTrailer: null,
    status: 'idle',
    error: null
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all favorite movies
            .addCase(fetchFavoriteMovies.pending, (state) => {
                state.favoriteMovies = [];
                state.status = 'loading';
            })
            .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
                state.favoriteMovies = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchFavoriteMovies.rejected, (state, action) => {
                state.favoriteMovies = [];
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch single movie by ID
            .addCase(fetchMovieById.pending, (state) => {
                state.movie = null;
                state.status = 'loading';
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.movie = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.movie = null;
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch single movie by name
            .addCase(fetchMovieByName.pending, (state) => {
                state.movie = null;
                state.status = 'loading';
            })
            .addCase(fetchMovieByName.fulfilled, (state, action) => {
                state.movie = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchMovieByName.rejected, (state, action) => {
                state.movie = null;
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch movies by request
            .addCase(fetchMoviesByRequest.pending, (state) => {
                state.movies = [];
                state.status = 'loading';
            })
            .addCase(fetchMoviesByRequest.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchMoviesByRequest.rejected, (state, action) => {
                state.movies = [];
                state.status = 'failed';
                state.error = action.payload;
            })

            // Like toggle
            .addCase(fetchLikeToggle.pending, (state) => {
                state.favoriteMovies = [];
                state.status = 'loading';
            })
            .addCase(fetchLikeToggle.fulfilled, (state, action) => {
                state.favoriteMovies = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchLikeToggle.rejected, (state, action) => {
                state.favoriteMovies = [];
                state.status = 'failed';
                state.error = action.payload;
            })

            // Fetch movie trailer
            .addCase(fetchMovieTrailer.pending, (state) => {
                state.movieTrailer = null;
                state.status = 'loading';
            })
            .addCase(fetchMovieTrailer.fulfilled, (state, action) => {
                state.movieTrailer = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchMovieTrailer.rejected, (state, action) => {
                state.movieTrailer = null;
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const selectAllMovies = (state) => state.movies.movies;
export const selectFavoriteMovies = (state) => state.movies.favoriteMovies;
export const selectMovie = (state) => state.movies.movie;
export const selectMovieById = (state, id) => state.movies.movies.find(movie => movie.id === id);
export const selectMovieTrailer = (state) => state.movies.movieTrailer;
export const movieReducer = movieSlice.reducer;