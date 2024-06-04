import React, {useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuth} from "../../context/AuthProvider";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {useMovies} from "../../context/MoviesProvider";
import Movie from "../../components/media/Movie";

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
