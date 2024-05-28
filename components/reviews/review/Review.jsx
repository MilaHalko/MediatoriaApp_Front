import React from 'react';
import ReviewHeader from "./ReviewHeader";
import {Text, View} from "react-native";
import ReviewText from "./ReviewText";
import ReviewFooter from "./ReviewFooter";

const Review = ({review, styles}) => {
    return (
        <View key={review._id} className={`bg-main p-3 rounded ${styles}`}>
            <ReviewHeader review={review}/>
            <View className='h-[2px] justify-center bg-dry my-1'/>
            <ReviewText reviewText={review.text}/>
            <View className='h-[2px] justify-center bg-dry my-1'/>
            <ReviewFooter review={review}/>
        </View>
    );
};

export default Review;
