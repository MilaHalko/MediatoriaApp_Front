import React from 'react';
import {ActivityIndicator, View} from "react-native";
import {Colors} from "../constants/Colors";

const LoadingIndicator = ({color = Colors.text, center = true, styles, size = 'large'}) => {
    return (
        <View className={`m-4 ${center ? 'flex-1 w-full align-middle justify-center h-full' : ''} ${styles}`}>
            <ActivityIndicator size={size} color={color}/>
        </View>
    );
};

export default LoadingIndicator;
