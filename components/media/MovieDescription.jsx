import {Text, View} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";

const MovieDescription = ({movie}) => {
    // TODO: Implement GetMovieGenres function
    let genres = movie.genre_ids?.slice(0, 3)
    return (
        <View className="gap-1">
            <View className="flex flex-row">
                {
                    genres?.map((genre, index) => (
                        <View key={index} className={`flex flex-row`}>
                            <Text className="text-xs text-dryGray font-poppins-medium">{genre}</Text>
                            {index < genres.length - 1 &&
                                <Text key={index} className="text-xs text-dryGray font-poppins-medium">
                                    /
                                </Text>}
                        </View>
                    ))
                }
                {
                    movie.genre_ids?.length > 3 &&
                    <Text className="text-xm text-dryGray font-medium">...</Text>
                }
            </View>
            <View className="flex flex-row">
                <FontAwesome5 name="calendar-alt" size={15} color={Colors.subMain}/>
                <Text className="text-xs text-dryGray ml-2 font-poppins-medium">{movie?.release_date}</Text>
            </View>
        </View>
    )
}

export default MovieDescription
