import {createContext, useContext} from "react";
import {useDispatch} from "react-redux";
import {useAuth} from "./AuthProvider";
import {tmdb} from "../api/tmdb";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

const MoviesContextProvider = ({children}) => {
    const dispatch = useDispatch()
    const {user} = useAuth()

    const getMovieById = async (id) => {
        // TODO: firstly upload from our DB
        // if not found - download from TMDB
        const movie = await tmdb.getMovieById(id).catch(e => console.log(e))
        console.log(movie)
        return movie
    }

    return (
        <MovieContext.Provider
            value={{
                getMovieById: getMovieById
                }}
        >
            {children}
        </MovieContext.Provider>
    )
}

export default MoviesContextProvider;