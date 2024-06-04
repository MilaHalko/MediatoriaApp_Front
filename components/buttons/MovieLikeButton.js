import {Entypo} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {View} from "react-native";
import React, {useEffect, useState} from "react";
import {useMovies} from "../../context/MoviesProvider";

function MovieLikeButton({tmdbMovieId, iconSize = 25, containerStyles = ''}) {
    const {likeToggle, loading, favoriteMovies} = useMovies();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const includes = favoriteMovies.some((movie) => movie.tmdbId === tmdbMovieId);
        setIsLiked(includes);
    } , [favoriteMovies])

    const onPress = async () => {
        if (loading) return;
        await likeToggle(tmdbMovieId, isLiked);
    }

    return (
        <View className={`flex-row items-center ${containerStyles}`}>
            {
                isLiked
                    ? <Entypo name="heart" size={iconSize} color={Colors.subMain} onPress={onPress}/>
                    : <Entypo name="heart-outlined" size={iconSize} color={loading ? Colors.text : Colors.white}
                              onPress={onPress}/>
            }
        </View>
    )
}

export default MovieLikeButton
