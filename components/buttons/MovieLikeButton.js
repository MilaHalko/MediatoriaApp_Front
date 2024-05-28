import {Entypo} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {View} from "react-native";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthProvider";
import {useMovies} from "../../context/MoviesProvider";

function MovieLikeButton({movieId, iconSize = 25, containerStyles = ''}) {
    const {user} = useAuth();
    const {likeToggle} = useMovies();
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const favorites = user.favoriteMovies
        setIsLiked(favorites?.includes(movieId.toString()));
    }, [user, movieId]);

    const onPress = async () => {
        if (loading) return;
        setLoading(true);
        await likeToggle(movieId, isLiked);
        setLoading(false);
    }

    return (
        <View className={`flex-row items-center ${containerStyles}`}>
            {
                isLiked
                    ? <Entypo name="heart" size={iconSize} color={Colors.subMain} onPress={onPress}/>
                    : <Entypo name="heart-outlined" size={iconSize} color={loading ? Colors.text : Colors.white} onPress={onPress}/>
            }
        </View>
    )
}

export default MovieLikeButton
