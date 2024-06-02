import React, {useEffect} from 'react';
import {useMovies} from "../../context/MoviesProvider";
import {View} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";

const MoviePlayer = ({movie, isPlaying, styles}) => {
    const {loadMovieTrailer, trailer, loading} = useMovies();

    useEffect(() => {
        loadMovieTrailer(movie.id);
    }, [movie]);

    return (
        <>
            {isPlaying && trailer && (
                <View className={`bg-main w-full ${styles}`}>
                    <YoutubeIframe
                        height={230}
                        videoId={trailer}
                        play={true}
                        onError={e => console.error(e)}
                    />
                </View>
            )}
        </>
    );
};

export default MoviePlayer;
