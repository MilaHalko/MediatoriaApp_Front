import React, { forwardRef } from 'react';
import { View } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

const MoviePlayer = forwardRef(({ youTubeKey, styles, onPause, startSec }, ref) => {
    const onChangeHandler = (e) => {
        console.log(e);
        if (e === 'paused' || e === 'ended') {
            onPause();
        }
    }
    return (
        <View className={`bg-main w-full ${styles}`}>
            <YoutubeIframe
                ref={ref}
                height={230}
                videoId={youTubeKey}
                play={true}
                onError={e => console.error(e)}
                onChangeState={onChangeHandler}
                initialPlayerParams={{ start: startSec }}
            />
        </View>
    );
});

export default MoviePlayer;
