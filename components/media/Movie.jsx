import {Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import MovieImage from "./MovieImage";
import MovieLikeButton from "../buttons/MovieLikeButton";
import {useMovies} from "../../context/MoviesProvider";
import {router} from "expo-router";

const Movie = ({movie}) => {
    const {loadMovieById, loading} = useMovies();
    const iconContainerStyles = 'mr-1';
    const h = "[150px]";

    const moviePressHandler = async () => {
        loadMovieById(movie.id).then(_ => {
            router.push(`/(movie)/${movie.id}`);
        }).catch(e => {
            console.error('Error fetching movie:', e);
        })
    }

    if (loading) return null;
    return (
        <TouchableOpacity
            className={`border-2 border-dry h-[150px] w-auto active:scale-105 ${loading ? 'opacity-50' : ''}`}
            onPress={moviePressHandler}
            activeOpacity={0.7}
            disabled={loading}
        >
            <MovieImage movie={movie} styles={'w-full h-full'} overlay={true} h={h}/>
            <View className="flex flex-row absolute p-1 bottom-0 left-0 right-0 w-full bg-[#00000070]">
                <MovieLikeButton movieId={movie.id} containerStyles={iconContainerStyles}/>
                <View className='flex-1 justify-center'>
                    <Text ellipsizeMode={'tail'} numberOfLines={1}
                          className={`capitalize font-sans text-14 font-bold text-white`}>
                        {movie?.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Movie;
