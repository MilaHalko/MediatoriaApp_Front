import React from 'react'
// import {Swiper, SwiperSlide} from "swiper/react";
// import {Autoplay} from "swiper/modules";
// import MovieItems from "../MovieItems";
// import {Link} from "react-router-dom";
// import {MovieContextConsumer} from "../../Context/MovieContext";
import {Text, View} from "react-native";
import Swiper from "react-native-swiper";
import {tmdbMovies20} from "../../dummyData/tmdbMovies10";
import MovieImage from "./MovieImage";
import {Link} from "expo-router";

const Banner = ({fetchUrl, h = '450px'}) => {
    // const {GetMoviesByRequest} = MovieContextConsumer()
    // const Movies = GetMoviesByRequest(fetchUrl, 10);

    const Movies = tmdbMovies20;

    return (
        <View className="w-full">
            <Swiper
                horizontal={false}
                loop={true}
                showsButtons={true}
                autoplay={true}
                autoplayTimeout={4}
                className="w-full bg-dry h-[450px] overflow-hidden">

            {/*    direction={'vertical'}*/}
            {/*    slidesPerView={1}*/}
            {/*    loop={true}*/}
            {/*    speed={1000}*/}
            {/*    modules={[Autoplay]}*/}
            {/*    autoplay={{delay: 4000, disableOnInteraction: false}}*/}
                {Movies?.map((movie, index) => (
                    <View key={index} className="relative rounded">
                        <MovieImage movie={movie}/>
                        <View className="absolute linear-bg pl-8 top-0 bottom-0 left-0 right-0 flex flex-col justify-center gap-3">
                            <Text className="truncate capitalize font-sans text-xl font-bold pb-1">
                                {movie.title}
                            </Text>
                            {/*<div className="flex text-dryGray">*/}
                            {/*    <MovieItems movie={movie}/>*/}
                            {/*</div>*/}
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

export default Banner
