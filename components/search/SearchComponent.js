import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from "react-native";
import SearchInput from "../fields/SearchInput";
import Picker from "./Picker";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {useMovies} from "../../context/MoviesProvider";

const SearchComponent = ({styles}) => {
    const [localLoading, setLocalLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(false);
    const [movieToSearch, setMovieToSearch] = useState('Barbie');
    const {tmdbGenres, loadMovieByName} = useMovies();
    const [genre, setGenre] = useState(null);
    const [year, setYear] = useState(null);

    const currentYear = new Date().getFullYear();
    const {width} = Dimensions.get('window');
    const iconWidth = 25;
    const pickerWidth = (width - iconWidth - 2 * 25) / 2;

    useEffect(() => {
        if (!tmdbGenres) return
        setLocalLoading(false)
    }, [tmdbGenres])

    const onSearch = () => {
        if (movieToSearch === '' && !genre && !year) return
        if (movieToSearch) {
            loadMovieByName(movieToSearch)
        }
    }

    const onClosePress = () => {
        setActiveTab(false)
        setYear(null)
        setGenre(null)
        setMovieToSearch('')
    }

    return (
        <View className={`w-full ${styles}`}>
            <SearchInput
                placeholder='Search for movies, series, etc.'
                value={movieToSearch}
                onChangeText={setMovieToSearch}
                onSearch={onSearch}
                onPress={() => setActiveTab(true)}
                styles={`px-1 ${activeTab ? 'mb-0' : ''}`}/>
            {
                activeTab && !localLoading &&
                <View className='p-1 mt-1 flex-row'>
                    <TouchableOpacity
                        className={`w-${iconWidth} items-center justify-center pl-1 pr-2`}
                        onPress={onClosePress} activeOpacity={0.7}
                    >
                        <Ionicons name="close" size={iconWidth} color={Colors.star}/>
                    </TouchableOpacity>

                    <Picker setValue={setYear}
                            itemsArray={Array.from({length: currentYear - 1900}, (_, i) => currentYear - i)}
                            placeholder='Year'
                            widthPx={pickerWidth}
                    />

                    <Picker setValue={setGenre}
                            itemsArray={tmdbGenres.map(genre => genre.name)}
                            placeholder='Genre'
                            widthPx={pickerWidth}
                    />
                </View>
            }
        </View>
    );
};

export default SearchComponent;
