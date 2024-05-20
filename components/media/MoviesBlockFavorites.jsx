import { View, ActivityIndicator } from "react-native";
import Title from "../Title";
import Movie from "./Movie";
import { SimpleGrid } from "react-native-super-grid";
import { useMovies } from "../../context/MoviesProvider";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";

const MoviesBlockFavorites = ({ title, icon, movies}) => {
    const [loading, setLoading] = useState(true);
    return (
        <View className="w-full">
            <Title title={title} Icon={icon} viewClassName={'px-2'} />
            <SimpleGrid
                itemDimension={150}
                data={movies}
                renderItem={({ item }) => (<Movie movie={item} />)}
                spacing={8}
            />
        </View>
    );
}

export default MoviesBlockFavorites;
