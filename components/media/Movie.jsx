import { Alert, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import MovieImage from "./MovieImage";
import { useAuth } from "../../context/AuthProvider";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import {router} from "expo-router";
import LikeButton from "../buttons/LikeButton";

const Movie = ({ movie, isLoading }) => {
    const { user, addFavorite, removeFavorite } = useAuth();
    const [movieId, setMovieId] = useState(movie.id);
    const [containerWidth, setContainerWidth] = useState(0);
    const iconSize = 25;
    const iconContainerStyles = 'mr-1';

    useEffect(() => {
        setMovieId(movie.id);
    }, [user, movie.id]);

    const moviePressedHandler = async () => {
        try {
            console.log(`Navigating to movie ${movie.title}`);
            router.push(`/(movie)/${movieId}`);
        } catch (e) {
            Alert.alert('Navigation Error', e.message);
        }
    }

    const onLayout = (e) => {
        setContainerWidth(e.nativeEvent.layout.width);
    }

    if (isLoading) return null;
    return (
        <TouchableOpacity
            className={`border-2 border-dry h-[150px] w-auto active:scale-105 ${isLoading ? 'opacity-50' : ''}`}
            onPress={moviePressedHandler}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <MovieImage movie={movie} styles={'w-full h-full'}/>
            <View className="flex flex-row absolute p-1 bottom-0 left-0 right-0 w-full bg-[#00000070]">
                <LikeButton movieId={movieId} containerStyles={iconContainerStyles}/>
                <View className='flex-1 justify-center' onLayout={onLayout}>
                    <Text ellipsizeMode={'tail'} numberOfLines={1} className={`capitalize font-sans text-14 font-bold text-white`}>
                        {movie.title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Movie;
