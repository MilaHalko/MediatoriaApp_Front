import React from 'react';
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import MovieTab from "./[movieId]";
import {Colors} from "../../constants/Colors"; // Import the MovieTab component

const MovieLayout = () => {
    return (
        <>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="[movieId]"/>
                <Stack.Screen name="[moviePlayerId]"/>
            </Stack>
            <StatusBar backgroundColor={Colors.main} style="light"/>
        </>
    );
};

export default MovieLayout;
