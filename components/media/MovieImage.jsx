import React, {useEffect, useState} from 'react'
import {Image, View} from "react-native";
import {noMovieImage} from "../../constants/images";
import {getValidTmdbImgUrl} from "../../scripts/tmdb";

const MovieImage = ({movie, h = 'full', styles = ''}) => {
    const [imageSource, setImageSource] = useState(null)
    const finalStyles = `${styles} w-full object-cover h-${h}`

    useEffect(() => {
        getValidTmdbImgUrl(movie).then(res => {
            res = res ? {uri: res} : noMovieImage
            setImageSource(res)
        }).catch(err => {
            console.log(err)
            setImageSource(noMovieImage)
        })
    }, [movie]);

    return (
        <View className={`${styles} justify-center bg-noPosterAvailable`}>
            <Image source={imageSource}
                   alt={movie?.title}
                   className={finalStyles}
            />
        </View>
    )
}

export default MovieImage
