import React from 'react';
import {Text, View} from "react-native";
import {dateFromTimestamp} from "../../../scripts/mongoParser";

const ReviewHeader = ({review, styles}) => {
    return (
        <View className={`flex flex-row justify-between ${styles}`}>
            <View className='justify-center'>
                <Text className='text-white font-hammersmith text-lg capitalize'>
                    {review.authorId.username}
                </Text>
            </View>
            <View className='justify-center'>
                <Text className='text-white opacity-50 text-xs'>
                    {dateFromTimestamp(review.createdAt)}
                </Text>
            </View>
        </View>
    );
};

export default ReviewHeader;
