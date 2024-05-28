import React from 'react';
import ReviewHeader from "./ReviewHeader";
import {Text, View} from "react-native";
import ReviewText from "./ReviewText";
import ReviewFooter from "./ReviewFooter";

const Review = ({review, styles}) => {
    return (
        <View key={review._id} className={`bg-main p-3 rounded ${styles}`}>
            <ReviewHeader review={review}/>
            <View className='h-[2px] justify-center bg-dry mt-1 mb-2'/>
            <ReviewText reviewText={review.text}/>
            <View className='h-[2px] justify-center bg-dry mt-2 mb-2'/>
            <Text>Review Form</Text>
            <ReviewFooter review={review} styles={'mt-1'}/>
        </View>
    );
};

export default Review;
