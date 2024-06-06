import React from 'react';
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Colors} from "../../constants/Colors";

function AuthLayout() {
    return (
        <>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="login"/>
                <Stack.Screen name="signup"/>
            </Stack>
            <StatusBar backgroundColor={Colors.main} style="light"/>
        </>
    );
}

export default AuthLayout;