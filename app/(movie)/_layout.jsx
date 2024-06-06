import React from 'react';
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Colors} from "../../constants/Colors";

const MovieLayout = () => {
    return (
        <>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="[movieId]"/>
            </Stack>
            <StatusBar backgroundColor={Colors.main} style="light"/>
        </>
    );
};

export default MovieLayout;
