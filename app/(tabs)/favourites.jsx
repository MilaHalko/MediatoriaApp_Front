import React from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {useAuth} from "../../context/AuthProvider";
import {useMovies} from "../../context/MoviesProvider";
import Title from "../../components/Title";
import {SimpleGrid} from "react-native-super-grid";
import Movie from "../../components/media/Movie";

const Favourites = () => {
    const {favoriteMovies} = useMovies();

    const icon = () => <FontAwesome name="heart" size={24} color={Colors.subMain}/>;
    return (
        <SafeAreaView className={'relative flex-1 bg-main'}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View className="items-center m-3">
                    <Title title={'Your Favorites'} Icon={icon} viewClassName={'px-2'}/>
                    <SimpleGrid
                        itemDimension={150}
                        data={favoriteMovies}
                        renderItem={({item}) => (<Movie movie={item}/>)}
                        spacing={8}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Favourites;
