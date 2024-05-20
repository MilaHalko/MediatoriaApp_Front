import {tmdbRequests} from "../constants/TMDB";
import axios from "axios";

const getMovieById = async (id) => {
    try {
        const res = await axios.get(tmdbRequests.iD(id))
        return res.data
    } catch (e) {
        console.log(e)
        return null;
    }
}

export const tmdb = {
    getMovieById
}