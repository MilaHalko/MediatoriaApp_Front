import {tmdbMovies20} from "../../dummyData/tmdbMovies10";
import {View} from "react-native";
import Title from "../Title";
import Movie from "./Movie";
import {SimpleGrid} from "react-native-super-grid";
import {useMovies} from "../../context/MoviesProvider";
import {useEffect, useState} from "react";

const MoviesBlock = ({title, request, movieCount, icon}) => {
    const {getMoviesByRequest} = useMovies()
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getMoviesByRequest(request, movieCount).then((movies) => {
            setMovies(movies)
        })
    }, [])

    useEffect(() => {
        if (movies) {
            setLoading(false)
        }
    }, [movies])

    if (loading) return null
    return (
        <View className='w-full'>
            <Title title={title} Icon={icon} viewClassName={'px-2'}/>
            <SimpleGrid
                itemDimension={150}
                data={movies}
                renderItem={({item}) => (<Movie movie={item}/>)}
                spacing={8}
            />
        </View>
    )
}

export default MoviesBlock
