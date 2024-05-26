import React from 'react';
import {RefreshControl, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Movie from "../../components/media/Movie";

const MoviePlayer = ({movie}) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    })
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                <View className="items-center">
                    <Movie movie={movie}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MoviePlayer;
