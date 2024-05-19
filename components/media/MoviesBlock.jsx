import {tmdbMovies20} from "../../dummyData/tmdbMovies10";
import {View} from "react-native";
import Title from "../Title";
import Movie from "./Movie";
import {SimpleGrid} from "react-native-super-grid";

const MoviesBlock = ({title, request, movieCount, icon}) => {
    // TODO: Implement MovieContextConsumer
    // const {GetMoviesByRequest} = MovieContextConsumer()
    // const Movies = GetMoviesByRequest(request, movieCount);

    const items = [
        {
            id: 1,
            title: 'Item 1',
            backgroundColor: 'red',
        },
        {
            id: 2,
            title: 'Item 2',
            backgroundColor: 'green',
        },
        {
            id: 3,
            title: 'Item 3',
            backgroundColor: 'blue',
        },
        {
            id: 4,
            title: 'Item 4',
            backgroundColor: 'yellow',
        },
        {
            id: 5,
            title: 'Item 5',
            backgroundColor: 'orange',
        },
    ];
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
