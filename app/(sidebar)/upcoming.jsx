import React from 'react';
import {useMovies} from "../../context/MoviesProvider";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, View} from "react-native";
import Title from "../../components/Title";
import {SimpleGrid} from "react-native-super-grid";
import Movie from "../../components/media/Movie";
import BackButton from "../../components/buttons/BackButton";

const Upcoming = () => {
    const {upcomingMovies} = useMovies();
    const icon = () => <FontAwesome name="heart" size={24} color={Colors.subMain}/>;
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="items-center m-3">
                    <Title title={'Upcoming'} icon={icon} viewClassName={'px-2'}/>
                    <SimpleGrid
                        itemDimension={150}
                        data={upcomingMovies}
                        renderItem={({item}) => (<Movie movie={item}/>)}
                        spacing={8}
                    />
                </View>
                <BackButton/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Upcoming;
