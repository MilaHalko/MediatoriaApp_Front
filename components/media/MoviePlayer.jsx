import React from 'react';
import {View} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

const MoviePlayer = ({youTubeKey, styles}) => {
    console.log('MoviePlayer:', youTubeKey)
    return (
        <View className={`bg-main w-full ${styles}`}>
            <YoutubeIframe
                height={230}
                videoId={youTubeKey}
                play={true}
                onError={e => console.error(e)}
            />
        </View>
    );
};

export default MoviePlayer;
