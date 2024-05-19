import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/Colors";
import {FontAwesome} from "@expo/vector-icons";

const SearchInput = ({label, value, placeholder, onSearch, styles, onTextChange, ...props}) => {
    const icon = (<FontAwesome name="search" size={24} color='white' />)
    const [iconPressed, setIconPressed] = useState(false);

    useEffect(() => {
        if (iconPressed) {
            setTimeout(() => {
                setIconPressed(false)
            }, 500)
        }
    }, [iconPressed]);

    const handleIconPress = () => {
        setIconPressed(true)
        onSearch()
    }

    return (
        <View className={`w-full mb-5 ${styles}`}>
            {label && <Text className="text-border font-semibold text-base">{label}</Text>}
            <View className="w-full flex-row items-center justify-between">
                <TextInput
                    placeholder={placeholder}
                    onChange={onTextChange}
                    value={value}
                    className={`w-full h-full mt-1 p-3 text-base border-2 border-border rounded text-white focus:border-star
                    ${iconPressed && 'border-star'}`}
                    placeholderTextColor={Colors.text}
                    multiline={false}
                    onSubmitEditing={onSearch}
                    {...props}
                />

                <TouchableOpacity onPress={handleIconPress}>
                    <View className=" absolute right-0 top-[-23px] w-12 h-12 items-center justify-center">
                        {icon}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
        ;
};

export default SearchInput;
