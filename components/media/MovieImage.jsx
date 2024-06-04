import React, {useState} from 'react'
import {ImageBackground, StyleSheet, View} from "react-native";
import {noMovieImage} from "../../constants/images";
import {LinearGradient} from "expo-linear-gradient";
import LoadingIndicator from "../LoadingIndicator";

const MovieImage = ({imgUrl, overlay = false, imageStyles = '', styles = ''}) => {
    const [imageSource, setImageSource] = useState(imgUrl ? {uri: imgUrl} : noMovieImage)
    const finalStyles = `${styles} w-full object-contain h-full rounded`

    return (
        <View className={`justify-center rounded bg-dry ${styles}`}>
            <ImageBackground source={imageSource}
                             className={finalStyles}
                             imageStyle={imageStyles}
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

