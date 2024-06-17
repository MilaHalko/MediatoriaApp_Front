import axios from "./axios";

export const fetchUpdateWatchDuration = async (tmdbMovieId, watchDurationSec, currentPlayerTime) => {
    console.log('Update watch duration:', tmdbMovieId, watchDurationSec, currentPlayerTime)
    try {
        const {data} = await axios.post('/user-movie-statistics/update-watch-duration', {tmdbMovieId, watchDurationSec, currentPlayerTime});
        console.log('fetchUpdateWatchDuration completed')
        return data;
    } catch (e) {
        return e.response.data ? e.response.data : "Server error";
    }
}

export const fetchGetUserMovieStatistics = async (tmdbMovieId) => {
    console.log('Get user movie statistics:', tmdbMovieId)
    try {
        const {data} = await axios.get(`/user-movie-statistics/${tmdbMovieId}`);
        console.log('fetchGetUserMovieStatistics completed')
        return data;
    } catch (e) {
        return e.response.data ? e.response.data : "Server error";
    }
}