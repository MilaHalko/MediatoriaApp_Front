import React, {useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "../../context/AuthProvider";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import Movie from "../../components/media/Movie";
import {useMovies} from "../../context/MoviesProvider";

const SideBar = () => {
    const {user} = useAuth()
    const {getMovieById} = useMovies()
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const icon = () => <FontAwesome name="heart" size={24} color={Colors.subMain}/>

    useEffect(() => {
        getMovieById(1011985).then((movie) => {
            setMovie(movie)
        })
    }, [])

    useEffect(() => {
        if (movie) {
            setLoading(false)
        }
    }, [movie])

    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="m-3">
                    {/*<Movie movie={movie} isLoading={loading}/>*/}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SideBar;
