import React from 'react';
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const SideBar = () => {
    return (
        <SafeAreaView className={'flex-1'}>
            <Text>
                SideBar
            </Text>
        </SafeAreaView>
    );
};

export default SideBar;
