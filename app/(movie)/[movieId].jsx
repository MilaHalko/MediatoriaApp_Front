import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {router, useLocalSearchParams} from "expo-router";
import {useMovies} from "../../context/MoviesProvider";
import RedButton from "../../components/buttons/RedButton";
import MovieImage from "../../components/media/MovieImage";
import LoadingIndicator from "../../components/LoadingIndicator";
import MovieDescription from "../../components/media/MovieDescription";
import Title from "../../components/Title";
import LikeButton from "../../components/buttons/LikeButton";
import MoviePlayer from "../../components/media/MoviePlayer";

const MovieTab = () => {
        const {getMovieById} = useMovies()
        const {movieId} = useLocalSearchParams();
        const [movie, setMovie] = useState(null);
        const [loading, setLoading] = useState(true);
        const [refreshing, setRefreshing] = useState(false);
        const [isPlaying, setIsPlaying] = useState(false);
        const gap = '[30px]';
        console.log('Movie tab ID:', movieId)

        useEffect(() => {
            getMovieById(movieId).then((uploadedMovie) => {
                console.log('Movie tab:', uploadedMovie);
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
                    <RedButton title={"Home"} viewClassName={`bg-main border-border mb-3`} onPress={() => {
                        router.replace('/(tabs)/home')
                    }}/>
                    {loading ? <LoadingIndicator/>
                        : (<>
                            <MovieImage movie={movie} styles={`h-[230px]`} overlay={true}/>

                            <View className={`bg-dry p-2 my-5`}>
                                <Title title={movie.title} viewClassName={`m-3 ml-0`}/>
                                <View className={`flex flex-row items-center justify-between`}>
                                    <MovieDescription movie={movie} styles={`my-4 mt-0`}/>
                                </View>

                                <Text className={`text-white py-2 leading-6 text-justify font-poppins-light tracking-wide`}>
                                    {movie.overview}
                                </Text>

                                <View className={`flex flex-row justify-between items-center mt-5`}>
                                    <LikeButton movieId={movie.id} iconSize={30} containerStyles={`mr-3`}/>
                                    <RedButton title={"Watch"} viewClassName={`bg-main border-border`} onPress={() => {
                                        setIsPlaying(!isPlaying)
                                    }}/>
                                    <Text className={`text-white font-poppins-bold`}>
                                        {movie.vote_average}
                                    </Text>
                                </View>
                            </View>

                            <MoviePlayer movie={movie} isPlaying={isPlaying} styles={`w-full bg-dry p-2`}/>
                        </>)
                    }

                </ScrollView>
            </SafeAreaView>
        )
            ;
    }
;

export default MovieTab;
