import React from 'react';
import {Stack} from "expo-router";

function AuthLayout() {


    return (
        <>
            <Stack
                screenOptions={{ headerShown: false}}
            >
                <Stack.Screen
                    name="login"
                />
                <Stack.Screen
                    name="signup"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </>
    );
}

export default AuthLayout;