import React from 'react';
import {Text, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {useAuth} from "../../context/AuthProvider";
import ReviewLikeIcon from "../buttons/ReviewLikeIcon";

const ReviewFooter = ({review, styles}) => {
    const {user} = useAuth();
    const iconSize = 24;

    console.log('Likes:', review.likes)
    return (
        <View className={`flex flex-row justify-between ${styles}`}>
            <View className={'flex flex-row justify-center'}>
                <FontAwesome name="star" size={14} color={Colors.star}/>
                <Text style={{color: 'white', marginLeft: 5}}>{review.rating}</Text>
            </View>
            <View className={'flex flex-row justify-center'}>
                <View className={'justify-end'}>
                    <Text className={'text-text text-sm mr-1'}>
                        {review.likes.length}
                    </Text>
                </View>
                <ReviewLikeIcon review={review}/>
            </View>
        </View>
    );
};

export default ReviewFooter;
