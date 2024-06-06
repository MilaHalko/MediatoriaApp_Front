import {View} from "react-native";
import Title from "../Title";
import Movie from "./Movie";
import {useMovies} from "../../context/MoviesProvider";
import {useEffect, useState} from "react";
import {SimpleGrid} from "react-native-super-grid";
import LoadingIndicator from "../LoadingIndicator";

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
            <View className="flex-row">
                <Title title={title} Icon={icon} viewClassName={'px-2'}/>
                {localLoading || movies?.length === 0
                    ? <LoadingIndicator styles={'m-1'} center={false} size={'small'}/>
                    : <Title title={movies?.length}/>
                }
            </View>
            {
                localLoading || movies?.length === 0
                    ? <LoadingIndicator styles={'h-[200px]'}/>
                    : <SimpleGrid
                        itemDimension={150}
                        data={movies}
                        renderItem={({item}) => (<Movie movie={item} loading={localLoading}/>)}
                        spacing={8}
                    />
            }
        </View>
    )
        ;
}

export default MoviesBlock;
