import React, {useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {useAuth} from "../../context/AuthProvider";
import {useMovies} from "../../context/MoviesProvider";
import LoadingIndicator from "../../components/LoadingIndicator";
import Title from "../../components/Title";
import {SimpleGrid} from "react-native-super-grid";
import Movie from "../../components/media/Movie";

const Favourites = () => {
    const {user} = useAuth();
    const {getFavoriteMovies} = useMovies();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onLoad = () => {
        setLoading(true);
        setRefreshing(true);
        getFavoriteMovies().then((favouriteMovies) => {
            setMovies(favouriteMovies);
        }).catch((error) => {
            console.error('Failed to fetch favourite movies:', error);
        }).finally(() => {
            setRefreshing(false);
            setLoading(false);
        })
    }

    useEffect(() => {
        onLoad();
    }, [user]);

    const icon = () => <FontAwesome name="heart" size={24} color={Colors.subMain}/>;
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="items-center m-3">
                    <Title title={'Your Favorites'} Icon={icon} viewClassName={'px-2'}/>
                    {
                        loading ? <LoadingIndicator/>
                            : (
                                <SimpleGrid
                                    itemDimension={150}
                                    data={movies}
                                    renderItem={({item}) => (<Movie movie={item}/>)}
                                    spacing={8}
                                />
                            )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Favourites;
