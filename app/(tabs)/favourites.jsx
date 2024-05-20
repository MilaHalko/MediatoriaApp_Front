import React from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Title from "../../components/Title";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import MoviesBlock from "../../components/media/MoviesBlock";
import {useAuth} from "../../context/AuthProvider";
import {tmdbRequests} from "../../constants/TMDB";

const Favourites = () => {
    const {user} = useAuth()
    const icon = () => <FontAwesome name="heart" size={24} color={Colors.subMain}/>
    // TODO: Implement GetFavourites function

    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="items-center m-3">
                    <MoviesBlock title='Your Favourites' icon={icon} request={tmdbRequests.nowPlaying} movieCount={10}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Favourites;
