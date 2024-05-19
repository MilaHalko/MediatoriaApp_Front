import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import RedButton from "../components/buttons/RedButton";
import {router} from "expo-router";
import {useAuth} from "../context/AuthProvider";

export default function App() {
    const {user} = useAuth()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    useEffect(() => {
        if (loaded && user) {
            router.push('/(tabs)/home')
        }
    }, [loaded, user]);

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
                    <RedButton title={'Log in'} onPress={() => router.push('/login')}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}