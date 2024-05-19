import React from "react";
import {Text, View} from "react-native";

export const DataLine = ({label, value, styles}) => {
    return (
        <View className={`my-2 ${styles}`}>
            <Text className="text-border font-poppins-medium text-base mb-[2px]">{label}</Text>
            <Text className="text-lg font-poppins-bold text-white">{value}</Text>
        </View>
    )
}