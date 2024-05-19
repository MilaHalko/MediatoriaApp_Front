import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import MovieImage from "./MovieImage";
import MovieDescription from "./MovieDescription";

const Movie = ({movie, isLoading}) => {

    //<Link to={`/movie/${movie.id}/${movie?.title}`}>
    const moviePressedHandler = () => {
        console.log('Movie ', movie.title, ' clicked')
    }

    return (
        <>
            <TouchableOpacity
                // active:scale-105 relative overflow-hidden`}
                className={`border border-border h-[150px] rounded w-auto active:scale-105 ${isLoading ? 'opacity-50' : ''}`}
                onPress={moviePressedHandler}
                activeOpacity={0.7}
                disabled={isLoading}
            >
                <MovieImage movie={movie} styles={'w-full h-full'} imageStyles={{borderRadius: 3}}/>
                {/*TODO: text overflow*/}
                <View className="absolute p-1 bottom-0 left-0 right-0 h-[35px] w-full">
                    <Text className="capitalize font-sans text-lg font-bold text-white">
                        {movie.title}
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

//     <View className='absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-2'>
//         <Text className='font-semibold truncate'>{movie?.title}</Text>
//         {/*TODO: Implement MovieLikeButton*/}
//         {/*<MovieLikeButton movie={movie}/>*/}
//     </View>

export default Movie
