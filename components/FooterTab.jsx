import React from 'react';
import {Text, View} from "react-native";
import {Colors} from "../constants/Colors";

const FooterTab = ({icon, label, focused}) => {
    const color =  focused ? Colors.main : Colors.text;

    return (
        <View className='flex items-center justify-center gap-1'>
            {icon && React.cloneElement(icon, {color: color})}
            <Text className={`text-xs ${focused ? 'font-poppins-medium text-main' : 'font-poppins-light text-text'}`}>
                {label}
            </Text>
        </View>
    );
};

export default FooterTab;
