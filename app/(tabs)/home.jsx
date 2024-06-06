import React, {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Banner from "../../components/media/Banner";
import MoviesBlock from "../../components/media/MoviesBlock";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import SearchInput from "../../components/fields/SearchInput";
import {tmdbRequests} from "../../constants/TMDB";
import SearchComponent from "../../components/search/SearchComponent";

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const iconSize = 28

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    const starIcon = () => <FontAwesome name="star" size={iconSize} color={Colors.subMain}/>
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                <View className="items-center">
                    <SearchComponent/>
                    {/*<Banner fetchUrl={tmdbRequests.upcoming} styles='h-[300px]'/>*/}
                    <View className="w-full mt-4">
                        <MoviesBlock title= 'For You' request={tmdbRequests.nowPlaying} movieCount={1} icon={starIcon}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
        ;
};

export default Home;
