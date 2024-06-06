import React from 'react';
import {View } from "react-native";
import RatingStars from "./RatingStars";
import RedButton from "../../buttons/RedButton";
import { useReviews } from "../../../context/ReviewsProvider";
import TextInputWithMax from "../../fields/TextInput";

const ReviewForm = ({movieId, onSubmit, setUpdateMovie}) => {
    const { addReview, loading } = useReviews();
    const [rating, setRating] = React.useState(0);
    const [text, setText] = React.useState('');
    const [errors, setErrors] = React.useState({ rating: false, text: false });

    const handleSubmit = async () => {
        if (loading) return;
        if (rating === 0 || text.length === 0) {
            if (rating === 0) {
                setErrors((prevErrors) => ({ ...prevErrors, rating: true }));
                console.log('Rating error set to true');
            }
            if (text.length === 0) {
                setErrors((prevErrors) => ({ ...prevErrors, text: true }));
                console.log('Review text error set to true');
            }
            setTimeout(() => {
                setErrors({ rating: false, text: false });
            }, 2000);
            return;
        }
        console.log('Submitting review...');
        await addReview({rating, text, movieId});
        onSubmit();
        setUpdateMovie(true);
        console.log('Review submitted');
    };

    return (
        <View className='bg-main p-3 my-1 rounded'>
            <RatingStars rating={rating} setRating={(rating) => setRating(rating)} styles={'mb-1'} isError={errors.rating}/>
            <TextInputWithMax text={text} setText={(text) => setText(text)} styles={'my-2'} isError={errors.text} />
            <RedButton title={"Submit"} onPress={handleSubmit} isLoading={loading} viewClassName={'mt-1'} />
        </View>
    );
};

export default ReviewForm;
