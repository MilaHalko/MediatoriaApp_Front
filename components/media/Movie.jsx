import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import MovieImage from "./MovieImage";
import MovieLikeButton from "../buttons/MovieLikeButton";
import {useMovies} from "../../context/MoviesProvider";
import {router} from "expo-router";
import LoadingIndicator from "../LoadingIndicator";

const Movie = ({movie, loading}) => {
    const {loadMovieById} = useMovies();
    const iconContainerStyles = 'mr-1';

    const moviePressHandler = () => {
        loadMovieById(movie._id).then(_ => {
            router.push(`/(movie)/${movie._id}`);
        }).catch(e => {
            console.error('Error navigating fetching movie:', movie._id, e);
        });
    }

    return (
        <TouchableOpacity
            className={`border-2 border-dry h-[150px] w-auto active:scale-105 ${loading ? 'opacity-50' : ''}`}
            onPress={moviePressHandler}
            activeOpacity={0.7}
        >
            {
                loading ? <LoadingIndicator/>
                    : <>
                        <MovieImage imgUrl={movie.imgUrl} styles={'w-full h-full'} overlay={true}
                                    imageStyles={'h-[150px] w-full'}/>
                        <View className="flex flex-row absolute p-1 bottom-0 left-0 right-0 w-full bg-[#00000070]">
                            <MovieLikeButton tmdbMovieId={movie.tmdbId} containerStyles={iconContainerStyles}/>
                            <View className='flex-1 justify-center'>
                                <Text ellipsizeMode={'tail'} numberOfLines={1}
                                      className={`capitalize font-sans text-14 font-bold text-white`}>
                                    {movie?.title}
                                </Text>
                            </View>
                        </View>
                    </>
            }
        </TouchableOpacity>
    );
};

export default Movie;
