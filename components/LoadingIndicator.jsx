import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {Colors} from "../constants/Colors";

const LoadingIndicator = ({color = Colors.text, center = true}) => {
    return (
        <View className={`flex-1 w-full h-full ${center ? 'align-middle justify-center' : ''}`}>
            <ActivityIndicator size="large" color={color} className="m-4"/>
        </View>
    );
};

export default LoadingIndicator;
