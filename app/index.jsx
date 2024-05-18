import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import RedButton from "../components/buttons/RedButton";
import {router} from "expo-router";

export default function App() {
    return (
        <SafeAreaView className={'flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="flex-1 min-h-[85vh] items-center justify-center m-10">
                    <Text className={'text-2xl text-subMain font-poppins-regular'}>Welcome to</Text>
                    <Image
                        source={require('../assets/logos/mediatoria-red.png')}
                        className="w-full"
                        resizeMode="contain"
                    />
                    {/*Log User Token from AsyncStorage*/}
                    <Text className={'text-center text-subMain font-poppins-regular'}>
                        User Token:
                    </Text>
                    <RedButton title={'Log in'} onPress={() => router.push('/login')}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}