import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthProvider";
import {useReviews} from "../../context/ReviewsProvider";
import {View} from "react-native";

function ReviewLikeButton({review, iconSize = 22, containerStyles = ''}) {
    const {user} = useAuth();
    const {toggleLike, loading} = useReviews();
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsLiked(user && review?.likes?.includes(user._id));
    }, [user, review?.likes]);

    const onPress = async () => {
        if (loading) return;
        await toggleLike(review._id, isLiked);
    }

    return (
        <View className={`flex-row items-center ${containerStyles}`}>
            {
                isLiked
                    ? <AntDesign name="like1" size={iconSize} color={Colors.subMain} onPress={onPress}/>
                    : <AntDesign name="like2" size={iconSize} color={Colors.text} onPress={onPress}/>
            }
        </View>
    )
}

export default ReviewLikeButton
