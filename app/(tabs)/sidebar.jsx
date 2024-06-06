import React from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const SideBar = () => {
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="m-3">
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SideBar;
