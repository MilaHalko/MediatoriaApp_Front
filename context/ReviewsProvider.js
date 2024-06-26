import React, {createContext, useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createReview,
    deleteReview,
    fetchReview,
    fetchReviewsByMovieId, likeReview,
    selectAllReviews, unlikeReview
} from "../store/slices/reviewSlice";
import {Alert} from "react-native";

const ReviewsContext = createContext();
export const useReviews = () => useContext(ReviewsContext);

const ReviewsContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(selectAllReviews);
    const [loading, setLoading] = useState(false);

    const loadReviewsByMovieId = async (movieId) => {
        setLoading(true);
        try {
            await dispatch(fetchReviewsByMovieId(movieId)).unwrap();
        } catch (error) {
            console.error("Failed to load reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadReview = async (id) => {
        setLoading(true);
        try {
            await dispatch(fetchReview(id)).unwrap();
        } catch (error) {
            console.error("Failed to load review:", error);
        } finally {
            setLoading(false);
        }
    };

    const addReview = async ({text, rating, movieId}) => {
        setLoading(true);
        try {
            await dispatch(createReview({text, rating, movieId})).unwrap();
        } catch (error) {
            Alert.alert('Failed to add review', error.message);
            console.error("Failed to add review:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeReview = async (id) => {
        setLoading(true);
        try {
            await dispatch(deleteReview(id)).unwrap();
        } catch (error) {
            console.error("Failed to remove review:", error);
        } finally {
            setLoading(false);
        }
    };

    const likeReviewById = async (id) => {
        setLoading(true);
        try {
            await dispatch(likeReview(id)).unwrap();
        } catch (error) {
            console.error("Failed to like review:", error);
        } finally {
            setLoading(false);
        }
    };

    const unlikeReviewById = async (id) => {
        setLoading(true);
        try {
            await dispatch(unlikeReview(id)).unwrap();
        } catch (error) {
            console.error("Failed to unlike review:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleLike = async (id, isLiked) => {
        if (isLiked) {
            await unlikeReviewById(id);
        } else {
            await likeReviewById(id);
        }
    };

    return (
        <ReviewsContext.Provider value={{
            reviews,
            loadReviewsByMovieId,
            loadReview,
            addReview,
            removeReview,
            toggleLike,
            loading
        }}>
            {children}
        </ReviewsContext.Provider>
    );
};

export default ReviewsContextProvider;
