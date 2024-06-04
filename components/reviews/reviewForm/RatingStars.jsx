import React, {useEffect, useRef} from 'react';
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../../constants/Colors";
import {Animated, Text, TouchableOpacity, View} from "react-native";
import {MAX_RATING} from "../../../constants/config";

const RatingStars = ({rating, setRating, isError = false, styles}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const defineTextColor = () => setTextColor(rating > 0 ? Colors.star : Colors.border);
    const [textColor, setTextColor] = React.useState('border');

    useEffect(() => {
        if (isError) {
            setTextColor('subMain');
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            defineTextColor();
        }
    }, [isError]);

    useEffect(() => {
        defineTextColor();
    }, [rating]);

    const iconStarOutline = (index) => (
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <FontAwesome name="star-o" size={24} color={isError ? Colors.subMain : Colors.star}/>
        </Animated.View>
    );
    const iconStarFilled = (index) => (
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <FontAwesome name="star" size={24} color={isError ? Colors.subMain : Colors.star}/>
        </Animated.View>
    );

    return (
        <View className={`flex-row justify-between items-center ${styles}`}>
            <View className='flex-row items-center space-x-1'>
                {[...Array(MAX_RATING)].map((_, index) => (
                    <TouchableOpacity key={index} onPress={() => setRating(index + 1)} disabled={rating === index + 1}>
                        {index < rating ? iconStarFilled(index) : iconStarOutline(index)}
                    </TouchableOpacity>
                ))}
            </View>
            {/*TODO: color not working*/}
            <Text className={`font-hammersmith text-sm text-star`}>
                {rating} / {MAX_RATING}
            </Text>
        </View>
    );
};

export default RatingStars;
