import React, {useState} from 'react';
import Title from "../Title";
import {Text, View} from "react-native";
import MovieDescription from "./MovieDescription";
import MovieLikeButton from "../buttons/MovieLikeButton";
import RedButton from "../buttons/RedButton";

const MovieTabDescription = ({movie, styles, onPlay}) => {
    const [buttonTitle, setButtonTitle] = useState('Watch');
    const handlePlay = () => {
        setButtonTitle(buttonTitle === 'Watch' ? 'Hide' : 'Watch');
        onPlay();
    }
    return (
        <View className={`${styles}`}>
            <Title title={movie.title} viewClassName={`m-3 ml-0`}/>
            <View className={`flex flex-row items-center justify-between`}>
                <MovieDescription movie={movie} styles={`my-4 mt-0`}/>
            </View>

            <Text className={`text-white py-2leading-6 text-justify font-poppins-light tracking-wide`}>
                {movie.overview}
            </Text>

            <Text className={`text-white font-poppins-bold my-3`}>{movie.averageRating}</Text>

            <View className={`flex flex-row justify-between items-center`}>
                <MovieLikeButton tmdbMovieId={movie.tmdbId} iconSize={30} containerStyles={`mr-3`}/>
                {movie.youTubeKey &&
                    <RedButton title={buttonTitle} viewClassName={`bg-main border-border py-1`} onPress={handlePlay}/>
                }
            </View>
        </View>
    );
};

export default MovieTabDescription;
