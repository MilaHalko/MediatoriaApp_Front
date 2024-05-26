import {Text, View} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";

const MovieDescription = ({movie, maxGenresLength = 3, styles = ''}) => {
    // TODO: Implement GetMovieGenres function
    let genres = []
    if (movie.genre_ids) {
        genres = movie.genre_ids
    } else if (movie.genres) {
        genres = movie.genres?.map(genre => genre.name)
    }
    maxGenresLength = Math.min(maxGenresLength, genres.length)
    let releaseDate = movie.release_date
    return (
        <View className={`gap-1 ${styles}`}>
            <View className="flex flex-row">
                {
                    genres.length > 0 &&
                    genres.slice(0, maxGenresLength).map((genre, index) => (
                        <View key={index} className={`flex flex-row`}>
                            <Text className="text-xs text-dryGray font-poppins-medium">{genre}</Text>
                            {index < maxGenresLength - 1 &&
                                <Text key={index} className="text-xs text-dryGray font-poppins-medium">
                                    {` `} / {` `}
                                </Text>}
                        </View>
                    ))
                }
                {
                    genres.length > maxGenresLength &&
                    <Text className="text-xm text-dryGray font-medium">{' '}...</Text>
                }
            </View>
            <View className="flex flex-row">
                <FontAwesome5 name="calendar-alt" size={15} color={Colors.subMain}/>
                <Text className="text-xs text-dryGray ml-2 font-poppins-medium">{releaseDate}</Text>
            </View>
        </View>
    )
}

export default MovieDescription
