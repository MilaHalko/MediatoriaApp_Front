import React from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "../../context/AuthProvider";
import Banner from "../../components/media/Banner";
import MoviesBlock from "../../components/media/MoviesBlock";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";

const Home = () => {
    const {user, logout} = useAuth()
    const iconSize = 28

    const starIcon = () => <FontAwesome name="star" size={24} color={Colors.subMain}/>
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="items-center">
                    {/*TODO: Implement Banner fetchUrl={requests.requestNowPlaying}*/}
                    <Banner fetchUrl={''}/>
                    <View className="w-full mt-4 border-2 border-pink-600">
                        {/*TODO: Implement MoviesBlock request={requests.requestNowPlaying}*/}
                        <MoviesBlock title='For You' /*request={requests.requestNowPlaying}*/ movieCount={10} icon={starIcon}/>
                        {/*        <MoviesBlock title='Popular' request={requests.requestPopular} movieCount={30}/>*/}
                        {/*        <MoviesBlock title='Top Rated' request={requests.requestTopRated} movieCount={10}/>*/}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
        ;
};

export default Home;
