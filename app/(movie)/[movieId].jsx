import React, {useEffect, useRef, useState} from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams} from "expo-router";
import {useMovies} from "../../context/MoviesProvider";
import MovieImage from "../../components/media/MovieImage";
import LoadingIndicator from "../../components/LoadingIndicator";
import MoviePlayer from "../../components/media/MoviePlayer";
import MovieTabDescription from "../../components/media/MovieTabDescription";
import Reviews from "../../components/reviews/Reviews";
import BackButton from "../../components/buttons/BackButton";

const MovieTab = () => {
    const {movie, loading} = useMovies()
    const [isPlaying, setIsPlaying] = useState(false);
    const scrollViewRef = useRef(null);
    const gap = 3;


    useEffect(() => {
        console.log('MovieTab')
    }, [movie])


    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                        ref={scrollViewRef}
            >
                        <MovieImage movie={movie} styles={`h-[230px]`} overlay={true}/>
                        <View className={`h-${gap}`}/>
                        <MovieTabDescription movie={movie} styles={`bg-dry p-2 mb-${gap}`} onPlay={() => {setIsPlaying(!isPlaying)}}/>
                        <MoviePlayer movie={movie} isPlaying={isPlaying} styles={`w-full bg-dry p-2 mb-${gap}`}/>
                        <Reviews movieId={movie.id} styles={`bg-dry p-2 mb-${gap}`}/>
                <BackButton/>
            </ScrollView>
        </SafeAreaView>)
}


;

export default MovieTab;
