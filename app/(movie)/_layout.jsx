import React from 'react';
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import MovieTab from "./[movieId]";
import {Colors} from "../../constants/Colors"; // Import the MovieTab component

const MovieLayout = () => {
    return (
        <>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="[movieId]"/> {/* Use component prop directly */}
                <Stack.Screen name="moviePlayer"/>
            </Stack>
            <StatusBar backgroundColor={Colors.main} style="light"/>
        </>
    );
};

export default MovieLayout;
