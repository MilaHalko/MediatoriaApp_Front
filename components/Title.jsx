import React from 'react'
import {Text, View} from "react-native";

const Title = ({title, Icon, viewClassName}) => {
    return (
        <View className={`w-full flex-row items-center ${viewClassName}`}>
            {Icon &&
                <>
                    {Icon()}
                    <View className='w-3'/>
                </>
            }
            <Text className='font-poppins-bold text-white text-xl'>{title}</Text>
        </View>
    )
}

export default Title
