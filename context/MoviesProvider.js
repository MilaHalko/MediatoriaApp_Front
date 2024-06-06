import React, {createContext, useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchFavoriteMovies,
    fetchLikeToggle,
    fetchMovieById,
    fetchMoviesByName,
    fetchMoviesByRequest,
    fetchMovieTrailer, fetchTmdbGenres,
    selectAllMovies,
    selectFavoriteMovies,
    selectMovie,
    selectMovieTrailer, selectTmdbGenres
} from "../store/slices/movieSlice";
import {useAuth} from "./AuthProvider";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

const MoviesContextProvider = ({children}) => {
    const dispatch = useDispatch();
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);

    const movies = useSelector(selectAllMovies);
    const favoriteMovies = useSelector(selectFavoriteMovies);
    const movie = useSelector(selectMovie);
    const trailer = useSelector(selectMovieTrailer);
    const tmdbGenres = useSelector(selectTmdbGenres);

    useEffect(() => {
        if (user) {
            loadFavoriteMovies()
            getTmdbGenres()
        }
    }, [user]);


    const loadMovieById = async (id) => {
        setLoading(true);
        await dispatch(fetchMovieById(id))
        setLoading(false)
    };

    const loadMovieByName = async (name) => {
        setLoading(true);
        const result = await dispatch(fetchMoviesByName(name));
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
        await dispatch(fetchMoviesByRequest({query, movieCount}))
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
                movie,
                trailer,
                loading,
                tmdbGenres,
                loadMovieById,
                loadMovieByName,
                loadFavoriteMovies,
                loadMoviesByRequest,
                likeToggle,
                loadMovieTrailer,
                checkIfIsLiked,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export default MoviesContextProvider;
