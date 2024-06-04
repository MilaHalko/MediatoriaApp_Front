import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Banner from "../../components/media/Banner";
import MoviesBlock from "../../components/media/MoviesBlock";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import SearchInput from "../../components/fields/SearchInput";
import {tmdbRequests} from "../../constants/TMDB";

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [movieToSearch, setMovieToSearch] = useState('');
    const iconSize = 28

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setMovieToSearch('')
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const onSearch = () => {
        if (movieToSearch === '') return
        console.log('Searching for:', movieToSearch)
    }

    const starIcon = () => <FontAwesome name="star" size={iconSize} color={Colors.subMain}/>
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                <View className="items-center">
                    {/*TODO: Search feature*/}
                    <SearchInput
                        placeholder='Search for movies, series, etc.'
                        value={movieToSearch}
                        onChangeText={setMovieToSearch}
                        onSearch={onSearch}
                        styles='px-2'/>

                    <Banner fetchUrl={tmdbRequests.upcoming} styles='h-[300px]'/>
                    <View className="w-full mt-4">
                        <MoviesBlock title= 'For You' request={tmdbRequests.nowPlaying} movieCount={100} icon={starIcon}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
        ;
};

export default Home;
