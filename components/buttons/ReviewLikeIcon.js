import {AntDesign} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthProvider";
import {useReviews} from "../../context/ReviewsProvider";
import {View} from "react-native";

function ReviewLikeButton({review, iconSize = 22, containerStyles = ''}) {
    const {user} = useAuth();
    const {toggleLike} = useReviews();
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && review?.likes?.includes(user._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [user, review?.likes]);

    const onPress = async () => {
        if (loading) return;
        setLoading(true);
        await toggleLike(review._id, isLiked);
        setLoading(false);
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
