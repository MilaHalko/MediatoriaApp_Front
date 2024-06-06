import React from 'react';
import {Text, View} from "react-native";
import Swiper from "react-native-swiper";
import MovieImage from "./MovieImage";
import RedButton from "../buttons/RedButton";
import MovieDescription from "./MovieDescription";
import {useMovies} from "../../context/MoviesProvider";
import {router} from "expo-router";

const Banner = ({styles}) => {
    const {movies, loadMovieById} = useMovies()

    const watchPressHandler = async (movieId) => {
        loadMovieById(movieId).then(_ => {
            router.push(`/(movie)/${movieId}`);
        }).catch(e => {
            console.error('Error navigating fetching movie:', movieId, e);
        })
    }

    return (
        <View className={`w-full ${styles}`}>
            <Swiper
                showsButtons={false}
                showsPagination={false}
                autoplay={true}
                autoplayTimeout={4}
                loop={true}
            >
                {movies?.map((movie, index) => (
                    <View key={movie._id}>
                        <MovieImage imgUrl={movie.imgUrl} overlay={true}/>
                        <View className="absolute p-2 bottom-0 left-0 right-0">
                            <Text className="truncate capitalize font-sans text-xl font-bold pb-4 text-white">
                                {movie.title}
                            </Text>
                            <View className="flex-1 justify-between flex-row">
                                <View className="flex ">
                                    <MovieDescription movie={movie}/>
                                </View>
                                <RedButton title="Watch Now" onPress={() => watchPressHandler(movie._id)}
                                           viewClassName={'w-min px-2 py-0 min-h-[40px]'}
                                           textClassName={'text-sm border-1 border-blue-500'}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </Swiper>
        < /View>
    )
}

export default Banner;
