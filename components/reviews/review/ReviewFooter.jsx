import React from 'react';
import {Text, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../../constants/Colors";
import ReviewLikeIcon from "../../buttons/ReviewLikeIcon";

const ReviewFooter = ({review, styles}) => {
    const likeSize = 23;
    return (
        <View className={`flex flex-row justify-between ${styles}`}>
            <View className={'flex flex-row items-end'}>
                <FontAwesome name="star" size={14} color={Colors.star} style={{marginBottom: 1}}/>
                <Text style={{color: 'white', marginLeft: 5}}>{review.rating}</Text>
            </View>
            <View className={'flex flex-row items-end'}>
                <Text className={'text-text mr-1 text-end'}>
                    {review.likes.length}
                </Text>
                <ReviewLikeIcon review={review} iconSize={likeSize}/>
            </View>
        </View>
    );
};

export default ReviewFooter;
