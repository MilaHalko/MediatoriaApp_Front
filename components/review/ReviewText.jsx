import React from 'react';
import {Text, View} from "react-native";

const ReviewText = ({reviewText, styles}) => {
    console.log('Review text:', reviewText)
    const paragraphs = reviewText.split('\\n')
    return (
        <View className={`${styles} space-y-3`}>
            {
                paragraphs.map((paragraph, index) => (
                    <Text className='text-white font-poppins-light text-sm leading-6'>
                        {paragraph}
                    </Text>
                ))
            }
        </View>
    );
};

export default ReviewText;
