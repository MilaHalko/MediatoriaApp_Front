import React, {useEffect} from 'react';
import {View} from "react-native";
import Title from "../Title";
import {FontAwesome} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import LoadingIndicator from '../LoadingIndicator';
import {useReviews} from "../../context/ReviewsProvider";
import {useAuth} from "../../context/AuthProvider";
import RedButton from "../buttons/RedButton";
import ReviewForm from "./reviewForm/ReviewForm";
import Review from "./review/Review";

const Reviews = ({movieId, styles}) => {
        const {user} = useAuth();
        const {reviews, loadReviewsByMovieId, loading} = useReviews();
        const [isWriting, setIsWriting] = React.useState(false);

        useEffect(() => {
            if (movieId) {
                loadReviewsByMovieId(movieId);
                console.log('Reviews:', reviews)
            }
        }, [movieId]);

        const commentsIcon = () => <FontAwesome name="comments" size={24} color={Colors.star}/>;

        return (
            <View className={styles}>
                <View className='flex-1 flex-row justify-between mb-1'>
                    <Title Icon={commentsIcon} title={`Reviews ${reviews.length}`}/>
                    <RedButton title={isWriting ? "Cancel" : "Write Review"}
                               viewClassName={`bg-main border-border py-1`}
                               onPress={() => {setIsWriting(!isWriting)
                    }}/>
                </View>
                {isWriting && <ReviewForm movieId={movieId} onSubmit={() => {setIsWriting(false)}}/>}
                {loading ? <LoadingIndicator/>
                    : (
                        reviews.map((review) => (
                            <Review review={review} styles={'my-1'}/>
                        ))
                    )}
            </View>
        );
    }
;

export default Reviews;
