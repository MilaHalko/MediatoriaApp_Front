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

const MovieTab = () => {
    const {movie, loadMovieById} = useMovies()
    const [updateMovie, setUpdateMovie] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);
    const scrollViewRef = useRef(null);
    const gap = 3;

    useEffect(() => {
        if (!updateMovie) return;
        loadMovieById(movie._id);
    }, [updateMovie]);

    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} ref={scrollViewRef}>
                {!movie ? <LoadingIndicator/> :
                    <>
                        <MovieImage imgUrl={movie.imgUrl} styles={`h-[230px]`} overlay={true}/>
                        <View className={`h-${gap}`}/>
                        <MovieTabDescription movie={movie} styles={`bg-dry p-2 mb-${gap}`} onPlay={() => {
                            setIsPlaying(!isPlaying)
                        }}/>
                        {isPlaying &&
                            <MoviePlayer youTubeKey={movie.youTubeKey} styles={`w-full bg-dry p-2 mb-${gap}`}/>}
                        <Reviews setUpdateMovie={setUpdateMovie} movieId={movie._id} styles={`bg-dry p-2 mb-${gap}`}/>
                        <BackButton/>
                    </>
                }
            </ScrollView>
        </SafeAreaView>
    )
};

export default MovieTab;
