import React from 'react';
import {ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "../../context/AuthProvider";
import RedButton from "../../components/buttons/RedButton";
import Banner from "../../components/media/Banner";

const Home = () => {
    const {user, logout} = useAuth()
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="items-center">
                    <Banner fetchUrl={''}/>
                    <View className="m-3">
                        {/*        <MoviesBlock title='Popular' request={requests.requestPopular} movieCount={30}/>*/}

                    </View>
                    {/*        <Banner fetchUrl={requests.requestNowPlaying}/>*/}
                    {/*        <Promos/>*/}
                    {/*        <MoviesBlock title='Top Rated' request={requests.requestTopRated} movieCount={10}/>*/}


                    {/*<Text className={'text-2xl text-subMain font-poppins-regular'}>*/}
                    {/*    Welcome to Mediatoria*/}
                    {/*</Text>*/}
                    {/*<View className={'w-[280px] h-auto p-4 bg-gray-300 m-4'}>*/}
                    {/*    <Text className={'text-subMain text-lg font-poppins-regular py-4'}>*/}
                    {/*        User Token: <Text className={'text-main text-xs font-poppins-regular'}>{user?.token}</Text>*/}
                    {/*    </Text>*/}
                    {/*    <Text className={'text-subMain text-lg font-poppins-regular py-4'}>*/}
                    {/*        User Email: <Text className={'text-main text-lg font-poppins-regular'}>{user.email}</Text>*/}
                    {/*    </Text>*/}
                    {/*    <Text className={'text-subMain text-lg font-poppins-regular py-4'}>*/}
                    {/*        User Name: <Text className={'text-main text-lg font-poppins-regular'}>{user.username}</Text>*/}
                    {/*    </Text>*/}
                    {/*    <Text className={'text-subMain text-lg font-poppins-regular py-4'}>*/}
                    {/*        User Role: <Text className={'text-main text-lg font-poppins-regular'}>{user.role}</Text>*/}
                    {/*    </Text>*/}
                    {/*</View>*/}
                    {/*<RedButton title={'Log out'} onPress={logout}/>*/}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
        ;
};

export default Home;
