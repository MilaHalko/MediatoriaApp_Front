import React from 'react';
import {Text, View} from "react-native";
import Swiper from "react-native-swiper";
import {tmdbMovies20} from "../../dummyData/tmdbMovies10";
import MovieImage from "./MovieImage";
import {Link} from "expo-router";

const Banner = ({fetchUrl}) => {
    // const { GetMoviesByRequest } = MovieContextConsumer()
    // const Movies = GetMoviesByRequest(fetchUrl, 10);

    const Movies = tmdbMovies20;

    return (
        <View className="w-full">
            <Swiper
                showsButtons={false}
                showsPagination={false}
                autoplay={false}
                autoplayTimeout={4}
                loop={true}
                style={{height: 300}}
            >
                {Movies?.map((movie, index) => (
                    <View key={index}>
                        <MovieImage movie={movie} overlay={true}/>
                        <View className="absolute p-3 bottom-0 left-0 right-0 gap-1">
                            <Text className="truncate capitalize font-sans text-xl font-bold pb-1 text-white">
                                {movie.title}
                            </Text>
                             {/*<View className="flex text-dryGray">*/}
                             {/*   <MovieItems movie={movie}/>*/}
                             {/*</View>*/}
                            <View className="flex">
                                <Link href={`/movie/${movie.id}/${movie.title}`}
                                      className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium text-xs">
                                    Watch Now
                                </Link>
                            </View>
                        </View>
                    </View>
                ))}
            </Swiper>
        </View>
    )
}

export default Banner;
