import {tmdbImageBaseUrl} from "../constants/TMDB";
import {urlIsValid} from "../api/validation";

/**
 * Check if TMDB URL is successful response
 * @returns {Promise<string|null>}
 * @param movie with backdrop_path and poster_path
 */

export const getValidTmdbImgUrl = async (movie) => {
    // if (await urlIsValid('https://timesofindia.indiatimes.com/photo/90355881.cms'))
    //     return 'https://timesofindia.indiatimes.com/photo/90355881.cms'
    if (movie?.backdrop_path && await urlIsValid(tmdbImageBaseUrl + movie?.backdrop_path)) {
        return tmdbImageBaseUrl + movie?.backdrop_path
    }
    if (movie?.poster_path && await urlIsValid(tmdbImageBaseUrl + movie?.poster_path)) {
        return tmdbImageBaseUrl + movie?.poster_path
    }
    return null
}