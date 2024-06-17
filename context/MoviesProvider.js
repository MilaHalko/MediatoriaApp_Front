import React, {createContext, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchFavoriteMovies,
    fetchLikeToggle,
    fetchMovieById,
    fetchMoviesByName,
    fetchMoviesByRequest,
    fetchMovieTrailer, fetchTmdbGenres, fetchUpcomingMovies,
    selectAllMovies,
    selectFavoriteMovies,
    selectMovie,
    selectMovieTrailer, selectTmdbGenres, selectUpcomingMovies
} from "../store/slices/movieSlice";
import {useAuth} from "./AuthProvider";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

const MoviesContextProvider = ({children}) => {
    const dispatch = useDispatch();
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const [moviesLoading, setMoviesLoading] = useState(false);

    const movies = useSelector(selectAllMovies);
    const favoriteMovies = useSelector(selectFavoriteMovies);
    const upcomingMovies = useSelector(selectUpcomingMovies);
    const movie = useSelector(selectMovie);
    const trailer = useSelector(selectMovieTrailer);
    const tmdbGenres = useSelector(selectTmdbGenres);

    useEffect(() => {
        if (user) {
            loadFavoriteMovies()
            loadUpcomingMovies(10)
            getTmdbGenres()
        }
    }, [user]);


    const loadMovieById = async (id) => {
        setLoading(true);
        await dispatch(fetchMovieById(id))
        setLoading(false)
    };

    const loadMovieByName = async (name, count) => {
        setLoading(true);
        setMoviesLoading(true);
        const result = await dispatch(fetchMoviesByName({name, count}));
        setMoviesLoading(false);
        setLoading(false);
        return result.payload || [];
    };

    const loadFavoriteMovies = async () => {
        setLoading(true);
        await dispatch(fetchFavoriteMovies())
        setLoading(false)
    };

    const loadMoviesByRequest = async (query, movieCount) => {
        setLoading(true);
        setMoviesLoading(true);
        await dispatch(fetchMoviesByRequest({query, movieCount}))
        setMoviesLoading(false);
        setLoading(false)
    };

    const loadUpcomingMovies = async (movieCount) => {
        setLoading(true);
        await dispatch(fetchUpcomingMovies({count: movieCount}))
        setLoading(false)
    };

    const likeToggle = async (tmdbMovieId, isLiked) => {
        setLoading(true);
        await dispatch(fetchLikeToggle({tmdbMovieId, isLiked}));
        setLoading(false)
    };

    const loadMovieTrailer = async (id) => {
        setLoading(true);
        await dispatch(fetchMovieTrailer(id))
        setLoading(false)
    };

    const checkIfIsLiked = (movieId) => {
        return favoriteMovies?.includes(movieId.toString());
    }

    const getTmdbGenres = async () => {
        setLoading(true);
        await dispatch(fetchTmdbGenres())
        setLoading(false)
    }

    return (
        <MovieContext.Provider
            value={{
                movies,
                favoriteMovies,
                upcomingMovies,
                movie,
                trailer,
                loading,
                tmdbGenres,
                moviesLoading,
                loadMovieById,
                loadMovieByName,
                loadFavoriteMovies,
                loadUpcomingMovies,
                loadMoviesByRequest,
                likeToggle,
                loadMovieTrailer,
                checkIfIsLiked
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export default MoviesContextProvider;
