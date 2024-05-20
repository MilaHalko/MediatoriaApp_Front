import {createContext, useContext} from "react";
import {useDispatch} from "react-redux";
import {useAuth} from "./AuthProvider";
import {tmdb} from "../api/tmdb";
import axios from "axios";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

const MoviesContextProvider = ({children}) => {
    const dispatch = useDispatch()
    const {user} = useAuth()

    const getMovieById = async (id) => {
        // TODO: firstly upload from our DB
        // if not found - download from TMDB
        return await tmdb.getMovieById(id).catch(e => console.log(e))
    }

    const getMoviesByRequest = async (request, movieCount) => {
        if (movieCount === undefined) movieCount = 1000
        const steps = Math.ceil(movieCount / 20.0)
        let movies = []
        for (let i = 0; i < steps; i++) {
            await axios.get(request + `&page=${i + 1}`)
                .then((res) => {
                    movies.push(...res.data.results);
                    if (res.data.results.length < 20) {
                        return movies
                    }
                })
                .catch((e) => {
                    console.error("Error loading movies:", e);
                    return [];
                });
        }
        return movies.slice(0, movieCount)
    }

    return (
        <MovieContext.Provider
            value={{
                getMovieById: getMovieById,
                getMoviesByRequest: getMoviesByRequest,
                }}
        >
            {children}
        </MovieContext.Provider>
    )
}

export default MoviesContextProvider;