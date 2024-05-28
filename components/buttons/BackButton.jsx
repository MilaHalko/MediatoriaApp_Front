import React from 'react';
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {router} from "expo-router";

const BackButton = () => {
    return (
        <TouchableOpacity onPress={() => {router.back()}} className={'absolute top-0 left-0 py-2'}>
            <Ionicons name="chevron-back" size={35} color={Colors.border} />
        </TouchableOpacity>
    );
};

export default BackButton;
