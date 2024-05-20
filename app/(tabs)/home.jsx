import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "../../context/AuthProvider";
import Banner from "../../components/media/Banner";
import MoviesBlock from "../../components/media/MoviesBlock";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import SearchInput from "../../components/fields/SearchInput";

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [movieToSearch, setMovieToSearch] = useState('');
    const iconSize = 28

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setMovieToSearch('')
        setTimeout(() => setRefreshing(false), 2000);
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

                    {/*TODO: Implement Banner fetchUrl={requests.requestNowPlaying}*/}
                    <Banner fetchUrl={''} styles={'h-[200px]'}/>
                    <View className="w-full mt-4">
                        {/*TODO: Implement MoviesBlock request={requests.requestNowPlaying}*/}
                        <MoviesBlock title='For You' /*request={requests.requestNowPlaying}*/ movieCount={10} icon={starIcon}/>
                        {/*TODO: Implement Popular and Top Rated*/}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
        ;
};

export default Home;
