import React, { useEffect, useState } from 'react';
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import MoviesBlockFavorites from "../../components/media/MoviesBlockFavorites";
import { useAuth } from "../../context/AuthProvider";
import { useMovies } from "../../context/MoviesProvider";

const Favourites = () => {
    const { user } = useAuth();
    const { getMovieById } = useMovies();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user?.favoriteMovies) {
                const favouriteMovies = await Promise.all(user.favoriteMovies.map(async (id) => {
                    try {
                        const movie = await getMovieById(id);
                        return movie;
                    } catch (error) {
                        console.error('Error fetching favorite movie:', error);
                        return null;
                    }
                }));
                // Filter out any null values (in case of errors)
                const filteredMovies = favouriteMovies.filter(movie => movie !== null);
                // Ensure no duplicates
                const uniqueMovies = Array.from(new Set(filteredMovies.map(movie => movie.id)))
                    .map(id => filteredMovies.find(movie => movie.id === id));
                setMovies(uniqueMovies);
            }
        };

        fetchFavorites();
    }, [user]);

    const icon = () => <FontAwesome name="heart" size={24} color={Colors.subMain} />;

    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="items-center m-3">
                    <MoviesBlockFavorites title={'Favourites'} icon={icon} movies={movies} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Favourites;
