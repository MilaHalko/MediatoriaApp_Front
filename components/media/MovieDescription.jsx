import {Text, View} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {dateFromTimestamp} from "../../scripts/mongoParser";

const MovieDescription = ({movie, maxGenresLength = 3, styles = ''}) => {
    maxGenresLength = Math.min(maxGenresLength, movie.genres.length)
    let releaseDate = dateFromTimestamp(movie.releaseDate)
    return (
        <View className={`gap-1 ${styles}`}>
            <View className="flex flex-row">
                {
                    movie.genres.length > 0 &&
                    movie.genres.slice(0, maxGenresLength).map(({id, name}, index) => (
                        <View key={id} className={`flex flex-row`}>
                            <Text className="text-xs text-dryGray font-poppins-medium">{name}</Text>
                            {index < maxGenresLength - 1 &&
                                <Text key={id} className="text-xs text-dryGray font-poppins-medium">
                                    {` `} / {` `}
                                </Text>}
                        </View>
                    ))
                }
                {
                    movie.genres.length > maxGenresLength &&
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
