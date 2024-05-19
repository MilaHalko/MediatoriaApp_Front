import React from 'react';
import {Text, View} from "react-native";
import Swiper from "react-native-swiper";
import {tmdbMovies20} from "../../dummyData/tmdbMovies10";
import MovieImage from "./MovieImage";
import RedButton from "../buttons/RedButton";
import MovieItems from "./MovieItems";

const Banner = ({fetchUrl}) => {
    // const { GetMoviesByRequest } = MovieContextConsumer()
    // const Movies = GetMoviesByRequest(fetchUrl, 10);

    const Movies = tmdbMovies20;

    const watchNowHandler = () => {
        console.log('Watch Now');
        // TODO: Implement navigation to movie details page
        // <Link href={`/movie/${movie.id}/${movie.title}`}
    }

    return (
        <View className="w-full">
            <Swiper
                showsButtons={false}
                showsPagination={false}
                autoplay={true}
                autoplayTimeout={4}
                loop={true}
                style={{height: 300}}
            >
                {Movies?.map((movie, index) => (
                    <View key={index}>
                        <MovieImage movie={movie} overlay={true}/>
                        <View className="absolute p-2 bottom-0 left-0 right-0">
                            <Text className="truncate capitalize font-sans text-xl font-bold pb-4 text-white">
                                {movie.title}
                            </Text>
                            <View className="flex-1 justify-between flex-row">
                                <View className="flex ">
                                    <MovieItems movie={movie}/>
                                </View>
                                <RedButton title="Watch Now" onPress={watchNowHandler}
                                           viewClassName={'w-min px-2 py-0 min-h-[40px]'}
                                           textClassName={'text-sm border-1 border-blue-500'}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </Swiper>
        </View>
    )
}

export default Banner;
