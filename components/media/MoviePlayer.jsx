import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import YoutubeIframe from 'react-native-youtube-iframe';
import { useMovies } from "../../context/MoviesProvider";

const MoviePlayer = ({ movie, isPlaying, styles}) => {
    const { getMovieTrailer } = useMovies();
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        getMovieTrailer(movie.id).then((trailer) => {
            setTrailerKey(trailer);
        }).catch(e => {
            console.error('Error fetching movie trailer:', e);
        });
    }, [movie.id]);

    return (
        <>
            {isPlaying && trailerKey && (
                <View className={`bg-main w-full ${styles}`}>
                    <YoutubeIframe
                        height={230}
                        videoId={trailerKey}
                        play={true}
                        onError={e => console.error(e)}
                    />
                </View>
            )}
        </>
    );
};

export default MoviePlayer;
