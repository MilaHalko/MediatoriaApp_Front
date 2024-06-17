import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useMovies} from "../../context/MoviesProvider";
import MovieImage from "../../components/media/MovieImage";
import MoviePlayer from "../../components/media/MoviePlayer";
import MovieTabDescription from "../../components/media/MovieTabDescription";
import Reviews from "../../components/reviews/Reviews";
import BackButton from "../../components/buttons/BackButton";
import LoadingIndicator from "../../components/LoadingIndicator";
import {fetchGetUserMovieStatistics, fetchUpdateWatchDuration} from "../../api/userMovieStatistics";

const MovieTab = () => {
    const playerRef = useRef();
    const {movie, loadMovieById} = useMovies()
    const [updateMovie, setUpdateMovie] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const [watchStart, setWatchStart] = useState(null);
    const [movieStatistics, setMovieStatistics] = useState(null);

    const scrollViewRef = useRef(null);
    const gap = 3;

    useEffect(() => {
        if (!movieStatistics) {
            console.log('Movie statistics not loaded, start loading...')
            fetchGetUserMovieStatistics(movie.tmdbId).then(data => {
                console.log('Movie statistics:', data);
                setMovieStatistics(data);
            });
        }
    }, [movieStatistics]);

    useEffect(() => {
        if (!updateMovie) return;
        console.log('Update movie page')
        loadMovieById(movie._id).then(() => {
            setMovieStatistics(null);
        });
    }, [updateMovie]);

    const handleTogglePlay = async () => {
        const newPlayingStatus = !isPlaying;
        console.log('Toggle play current:', newPlayingStatus);
        setIsPlaying(newPlayingStatus);
        if (newPlayingStatus && !watchStart) {
            const start = new Date();
            console.log('New WatchStart:', start);
            setWatchStart(start);
        } else if (!newPlayingStatus && watchStart) {
            console.log('Toggle pause')
            await handlePause();
            setWatchStart(null);
        }
    }

    const handlePause = async () => {
        console.log('Handle pause')
        const currentPlayerTime = await playerRef.current?.getCurrentTime();
        const watchDurationSec = (new Date() - watchStart) / 1000;
        if (watchStart) {
            console.log('Pause:', currentPlayerTime, watchDurationSec);
            await fetchUpdateWatchDuration(movie.tmdbId, watchDurationSec, currentPlayerTime);
        }
    }


    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} ref={scrollViewRef}>
                {!movie ? <LoadingIndicator/> :
                    <>
                        <MovieImage imgUrl={movie.imgUrl} styles={`h-[230px]`} overlay={true}/>
                        <View className={`h-${gap}`}/>
                        <MovieTabDescription movie={movie} styles={`bg-dry p-2 mb-${gap}`} onPlay={handleTogglePlay}/>
                        {isPlaying &&
                            <MoviePlayer youTubeKey={movie.youTubeKey}
                                         styles={`w-full bg-dry p-2 mb-${gap}`}
                                         onPause={handlePause}

                                         startSec={movieStatistics?.watchProgressSec || 0}
                                         ref={playerRef}
                            />
                        }
                        <Reviews setUpdateMovie={setUpdateMovie} movieId={movie._id} styles={`bg-dry p-2 mb-${gap}`}/>
                        <BackButton/>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
};

export default MovieTab;
