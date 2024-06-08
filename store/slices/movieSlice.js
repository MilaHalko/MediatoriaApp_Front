import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (id, {rejectWithValue}) => {
    console.log('fetchMovieById:', id)
    try {
        const {data} = await axios.get(`/movies/${id}`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchMoviesByName = createAsyncThunk('movies/fetchMovieByName', async ({name, count}, {rejectWithValue}) => {
    console.log('fetchMoviesByName:', name)
    try {
        const {data} = await axios.get(`/movies/name/${name}/${count}`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchFavoriteMovies = createAsyncThunk('movies/fetchFavoriteMovies', async (_, {rejectWithValue}) => {
    console.log('fetchFavoriteMovies...')
    try {
        const {data} = await axios.get('/movies/user/favorites');
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchMoviesByRequest = createAsyncThunk('movies/fetchMoviesByRequest',
    async ({query, movieCount}, {rejectWithValue}) => {
        console.log('fetchMoviesByRequest:', query, movieCount)
        try {
            const {data} = await axios.post('/movies/request', {query, movieCount});
            return data;
        } catch (e) {
            return e.response.data ? rejectWithValue(e.response.data) : "Server error";
        }
    });

export const fetchUpcomingMovies = createAsyncThunk('movies/fetchUpcomingMovies', async ({count}, {rejectWithValue}) => {
    console.log('fetchUpcomingMovies:', count)
    try {
        const {data} = await axios.post(`/movies/upcoming`, {movieCount: count});
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchLikeToggle = createAsyncThunk('movies/fetchLikeToggle',
    async ({tmdbMovieId, isLiked}, {rejectWithValue}) => {
        console.log('fetchLikeToggle:', tmdbMovieId, isLiked ? 'like' : 'dislike', 'to', !isLiked ? 'like' : 'dislike')
        try {
            const {data} = await axios.post('/movies/like-toggle', {tmdbMovieId, isLiked});
            return data;
        } catch (e) {
            return e.response.data ? rejectWithValue(e.response.data) : "Server error";
        }
    });

export const fetchMovieTrailer = createAsyncThunk('movies/fetchMovieTrailer', async (id, {rejectWithValue}) => {
    console.log('fetchMovieTrailer:', id)
    try {
        const {data} = await axios.get(`/movies/${id}/trailer`);
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});

export const fetchTmdbGenres = createAsyncThunk('movies/fetchTmdbGenres', async (_, {rejectWithValue}) => {
    console.log('fetchTmdbGenres...')
    try {
        const {data} = await axios.get('/tmdb/genres');
        return data;
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error";
    }
});


const initialState = {
    movies: [],
    favoriteMovies: [],
    upcomingMovies: [],
    movie: null,
    movieTrailer: null,
    tmdbGenres: [],
    status: 'idle',
    error: null
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        }
    },
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

            // Fetch movies by name
            .addCase(fetchMoviesByName.pending, (state) => {
                state.movies = [];
                state.status = 'loading';
            })
            .addCase(fetchMoviesByName.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchMoviesByName.rejected, (state, action) => {
                state.movies = null;
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

            // Fetch upcoming movies
            .addCase(fetchUpcomingMovies.pending, (state) => {
                state.upcomingMovies = [];
                state.status = 'loading';
            })
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                state.upcomingMovies = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchUpcomingMovies.rejected, (state, action) => {
                state.upcomingMovies = [];
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
            })

            // Fetch TMDB genres
            .addCase(fetchTmdbGenres.pending, (state) => {
                state.tmdbGenres = [];
                state.status = 'loading';
            })
            .addCase(fetchTmdbGenres.fulfilled, (state, action) => {
                state.tmdbGenres = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchTmdbGenres.rejected, (state, action) => {
                state.tmdbGenres = [];
                state.status = 'failed';
                state.error = action.payload;
            })
        ;
    }
});

export const selectAllMovies = (state) => state.movies.movies;
export const selectFavoriteMovies = (state) => state.movies.favoriteMovies;
export const selectUpcomingMovies = (state) => state.movies.upcomingMovies;
export const selectMovie = (state) => state.movies.movie;
export const selectMovieById = (state, id) => state.movies.movies.find(movie => movie.id === id);
export const selectMovieTrailer = (state) => state.movies.movieTrailer;
export const selectTmdbGenres = (state) => state.movies.tmdbGenres;
export const movieReducer = movieSlice.reducer;
export const {setMovies} = movieSlice.actions;
