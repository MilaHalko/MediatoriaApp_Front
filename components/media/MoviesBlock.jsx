import {tmdbMovies20} from "../../dummyData/tmdbMovies10";
import {View} from "react-native";
import Title from "../Title";
import Movie from "./Movie";
import {SimpleGrid} from "react-native-super-grid";

const MoviesBlock = ({title, request, movieCount, icon}) => {
    // TODO: Implement MovieContextConsumer
    // const {GetMoviesByRequest} = MovieContextConsumer()
    // const Movies = GetMoviesByRequest(request, movieCount);

    const Movies = tmdbMovies20;
    return (
        <View className='w-full'>
            <Title title={title} Icon={icon} viewClassName={'px-2'}/>
            <SimpleGrid
                itemDimension={150}
                data={Movies}
                renderItem={({item}) => (<Movie movie={item}/>)}
                spacing={8}
            />
        </View>
    )
}

export default MoviesBlock
