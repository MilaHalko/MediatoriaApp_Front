import React, {useEffect, useState} from 'react'
import {ImageBackground, StyleSheet, View} from "react-native";
import {noMovieImage} from "../../constants/images";
import {getValidTmdbImgUrl} from "../../scripts/tmdb";
import {LinearGradient} from "expo-linear-gradient";

const MovieImage = ({movie, h = 'full', styles = '', overlay = false, imageStyles=''}) => {
    const [imageSource, setImageSource] = useState(null)
    const finalStyles = `${styles} w-full object-contain h-${h} rounded`

    useEffect(() => {
        getValidTmdbImgUrl(movie).then(res => {
            res = res ? {uri: res} : noMovieImage
            setImageSource(res)
        }).catch(e => {
            console.log(e)
            setImageSource(noMovieImage)
        })
    }, [movie]);

    return (
        <View className={`${styles} justify-center bg-noPosterAvailable rounded`}>
            <ImageBackground source={imageSource}
                             alt={movie?.title}
                             imageStyle={imageStyles}
                             className={finalStyles}
            >
                {overlay &&
                    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']}
                                    className={'absolute top-0 bottom-0 left-0 right-0 bg-transparent'}/>
                }
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
});

export default MovieImage

