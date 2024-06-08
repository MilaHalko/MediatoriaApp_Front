import React from 'react'
import {Text, View} from "react-native";

const Title = ({title, icon, viewClassName}) => {
    return (
        <View className={`flex-row items-center ${viewClassName}`}>
            {icon &&
                <>
                    {icon && icon()}
                    <View className='w-3'/>
                </>
            }
            <Text className='font-poppins-bold text-white text-xl'>{title}</Text>
        </View>
    )
}

export default Title
