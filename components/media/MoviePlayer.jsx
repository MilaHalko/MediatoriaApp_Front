import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import YoutubeIframe from 'react-native-youtube-iframe';
import { useMovies } from "../../context/MoviesProvider";

const MoviePlayer = ({ movie, isPlaying, styles}) => {
    const { getMovieTrailer } = useMovies();
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        getMovieTrailer(movie.id).then((trailer) => {
            setTrailer(trailer);
        }).catch(e => {
            console.error('Error fetching movie trailer:', e);
        });
    }, [movie.id]);

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
