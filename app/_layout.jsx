import React, {useEffect} from 'react';
import {SplashScreen, Stack} from "expo-router";
import {Provider} from "react-redux";
import {useFonts} from "expo-font";
import {StatusBar} from "expo-status-bar";
import {Colors} from "../constants/Colors";
import 'react-native-reanimated'
import store from "../store/store";
import AuthContextProvider from "../context/AuthProvider";
import MoviesContextProvider from "../context/MoviesProvider";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Italic': require('../assets/fonts/Poppins-Italic.ttf'),
        'Hammersmith': require('../assets/fonts/HammersmithOne-Regular.ttf'),
    });

    useEffect(() => {
        if (error) {
            throw error;
        }
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <Provider store={store}>
            <AuthContextProvider>
                <MoviesContextProvider>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Screen name="index"/>
                        <Stack.Screen name="(auth)"/>
                        <Stack.Screen name="(tabs)"/>
                        <Stack.Screen name="(movie)"/>
                        <Stack.Screen name="search"/>
                    </Stack>
                    <StatusBar backgroundColor={Colors.main} style="light"/>
                </MoviesContextProvider>
            </AuthContextProvider>
        </Provider>
    )
}

export default RootLayout;