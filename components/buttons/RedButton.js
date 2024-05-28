import React from 'react'
import {Text, TouchableOpacity} from "react-native";

function RedButton({title, onPress, viewClassName, textClassName, isLoading}) {
    return (
        <TouchableOpacity
            className={`bg-subMain transition justify-center border border-subMain py-2 px-6 rounded w-auto ${viewClassName} ${isLoading ? 'opacity-50' : ''}`}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text className={`text-white font-poppins-medium text-lg text-center ${textClassName}`}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default RedButton
