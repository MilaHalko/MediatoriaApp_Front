import { Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import MovieImage from "./MovieImage";
import { useAuth } from "../../context/AuthProvider";

const Movie = ({ movie, isLoading }) => {
    const { user, addFavorite, removeFavorite } = useAuth();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(user?.favoriteMovies?.includes(movie.id.toString()));
    }, [user, movie.id]);

    const moviePressedHandler = async () => {
        console.log('Movie ', movie.title, ' liked!');
        if (isLiked) {
            await removeFavorite(movie.id).then(() => {
                Alert.alert(`Removed "${movie.title}" from favorites`);
                setIsLiked(false);
            }).catch(e => {
                Alert.alert('Error', e.message);
            });
        } else {
            await addFavorite(movie.id).then(() => {
                Alert.alert(`Added "${movie.title}" to favorites`);
                setIsLiked(true);
            }).catch(e => {
                Alert.alert('Error', e.message);
            });
        }
    };

    if (isLoading) return null;
    return (
        <TouchableOpacity
            className={`border border-border h-[150px] rounded w-auto active:scale-105 ${isLoading ? 'opacity-50' : ''} ${isLiked ? 'border-subMain' : ''}`}
            onPress={moviePressedHandler}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <MovieImage movie={movie} styles={'w-full h-full'} imageStyles={{ borderRadius: 3 }} />
            <View className="absolute p-1 bottom-0 left-0 right-0 h-[35px] w-full">
                <Text className="capitalize font-sans text-lg font-bold text-white">
                    {movie.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default Movie;
