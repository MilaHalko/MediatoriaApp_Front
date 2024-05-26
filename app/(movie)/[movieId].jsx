import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import {useMovies} from "../../context/MoviesProvider";
import RedButton from "../../components/buttons/RedButton";
import MovieImage from "../../components/media/MovieImage";
import LoadingIndicator from "../../components/LoadingIndicator";
import MovieDescription from "../../components/media/MovieDescription";

const MovieTab = () => {
        const {getMovieById} = useMovies()
        const {movieId} = useLocalSearchParams();
        const [movie, setMovie] = useState(null);
        const [loading, setLoading] = useState(true);
        const [refreshing, setRefreshing] = useState(false);
        console.log('Movie ID:', movieId)

        useEffect(() => {
            getMovieById(movieId).then((uploadedMovie) => {
                setMovie(uploadedMovie);
            }).catch(e => {
                console.error('Error fetching movies:', e);
            }).finally(() => {
                setLoading(false);
            });
        }, [movieId]);

        const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            setTimeout(() => setRefreshing(false), 1000);
        })

        return (
            <SafeAreaView className={'relative flex-1 bg-main'}>
                <ScrollView contentContainerStyle={{flexGrow: 1}}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >
                    <RedButton title={"Home"}
                               viewClassName={"bg-main border-border"}
                               onPress={() => {
                                   router.replace('/(tabs)/home')
                               }}
                    />

                    <View className="w-full mt-5">
                        <View className="flex h-[200px] flex-row justify-between">
                            {loading ? <LoadingIndicator/>
                                : (<>
                                    <MovieImage movie={movie} styles={"w-1/2 h-[400px]"} overlay={true}/>
                                    <MovieDescription movie={movie}/>
                                </>)
                            }
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
            ;
    }
;

export default MovieTab;
