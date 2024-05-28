import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {dateFromTimestamp} from "../../../scripts/mongoParser";
import {useAuth} from "../../../context/AuthProvider";
import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../../constants/Colors";
import {useReviews} from "../../../context/ReviewsProvider";
import {confirmAlert} from "../../../scripts/alerts";

const ReviewHeader = ({review, styles}) => {
    const {removeReview} = useReviews();
    const [isLoading, setIsLoading] = React.useState(false);
    const {user} = useAuth();
    const isAuthor = review.authorId._id === user._id;

    const handleDelete = async () => {
        if (isLoading) return;
        setIsLoading(true);
        console.log('Deleting review...');
        confirmAlert({
            title: 'Delete review',
            onConfirm: async () => {
                await removeReview(review._id);
                console.log('Review deleted');
            },
            isDestructive: true
        });
        setIsLoading(false);
    }

    return (
        <View className={`flex flex-row justify-between ${styles}`}>
            <View className='justify-center'>
                <Text className='text-white font-hammersmith text-lg capitalize'>
                    {review.authorId.username}
                </Text>
            </View>
            <View className='justify-center flex-row items-center'>
                <Text className='text-white opacity-50 text-xs'>
                    {dateFromTimestamp(review.createdAt)}
                </Text>
                {isAuthor &&
                    <TouchableOpacity className='ml-2' onPress={handleDelete} activeOpacity={0.5} disabled={isLoading}>
                        <AntDesign name="delete" size={24} color={Colors.text}/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default ReviewHeader;
