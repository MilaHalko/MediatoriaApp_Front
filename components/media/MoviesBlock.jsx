import {View} from "react-native";
import Title from "../Title";
import Movie from "./Movie";
import {useMovies} from "../../context/MoviesProvider";
import {useEffect, useState} from "react";
import {SimpleGrid} from "react-native-super-grid";

const MoviesBlock = ({title, request, movieCount, icon}) => {
    const {movies, loadMoviesByRequest} = useMovies();
    const [localLoading, setLocalLoading] = useState(false);

    useEffect(() => {
        loadMoviesByRequest(request, movieCount).then(_ => {
            setLocalLoading(false);
        })
    }, [request, movieCount]);

    return (
        <View className="w-full">
            <Title title={`${title} ${movies.length}`} Icon={icon} viewClassName={'px-2'}/>
            <SimpleGrid
                itemDimension={150}
                data={movies}
                renderItem={({item}) => (<Movie movie={item} loading={localLoading}/>)}
                spacing={8}
            />
        </View>
    )
        ;
}

export default MoviesBlock;
