import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from "react-native";
import SearchInput from "../fields/SearchInput";
import Picker from "./Picker";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "../../constants/Colors";
import {useMovies} from "../../context/MoviesProvider";
import {setMovies} from "../../store/slices/movieSlice";
import {useDispatch} from "react-redux";
import {tmdbRequests} from "../../constants/TMDB";
import {MOVIES_LOAD_COUNT, MOVIES_LOAD_REQUEST} from "../../constants/config";

const emptySearchData = {
    title: '',
    genre: null,
    year: null
}

const SearchComponent = ({styles}) => {
    const dispatch = useDispatch();
    const [localLoading, setLocalLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(false);
    const {tmdbGenres, loadMovieByName, loadMoviesByRequest, movies} = useMovies();
    const [previousSearchData, setPreviousSearchData] = useState(emptySearchData);
    const [searchData, setSearchData] = useState(emptySearchData);

    const currentYear = new Date().getFullYear();
    const {width} = Dimensions.get('window');
    const iconWidth = 25;
    const pickerWidth = (width - iconWidth - 2 * 25) / 2;

    useEffect(() => {
        if (!tmdbGenres) return;
        setLocalLoading(false);
    }, [tmdbGenres]);

    const isSearchDataSame = () => {
        const isSame = searchData.title.toLowerCase().trim() === previousSearchData.title.toLowerCase().trim() &&
            searchData.genre === previousSearchData.genre &&
            searchData.year === previousSearchData.year;
        if (isSame) console.log('Search data is same');
        return isSame;
    };

    const updatePreviousSearchData = () => {
        setPreviousSearchData({
            title: searchData.title,
            genre: searchData.genre,
            year: searchData.year
        });
    };

    const onSearch = async () => {
        console.log('Search data:', searchData);
        if (searchData.title === '' && !searchData.genre && !searchData.year) return;
        if (!isSearchDataSame()) {
            updatePreviousSearchData();
            const fetchedMovies = searchData.title === '' ? movies : await loadMovieByName(searchData.title, MOVIES_LOAD_COUNT);
            const filteredMovies = (fetchedMovies || []).filter(movie => {
                const releaseYear = movie.releaseDate ? movie.releaseDate.split('-')[0] : '';
                const genres = movie.genres ? movie.genres.map(genre => genre.name) : [];
                const matchesGenre = searchData.genre ? genres.includes(searchData.genre) : true;
                const matchesYear = searchData.year ? releaseYear === searchData.year.toString() : true;
                return matchesGenre && matchesYear;
            });
            dispatch(setMovies(filteredMovies));
        }
    };

    const onClosePress = () => {
        setActiveTab(false);
        setSearchData(emptySearchData);
        loadMoviesByRequest(MOVIES_LOAD_REQUEST, MOVIES_LOAD_COUNT);
    };

    return (
        <View className={`w-full ${styles}`}>
            <SearchInput
                placeholder='Search for movies, series, etc.'
                value={searchData.title}
                onChangeText={(text) => setSearchData(prev => ({...prev, title: text}))}
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

                    <Picker setValue={(year) => setSearchData(prev => ({...prev, year}))}
                            itemsArray={Array.from({length: currentYear - 1900}, (_, i) => currentYear - i)}
                            placeholder='Year'
                            widthPx={pickerWidth}
                    />

                    <Picker setValue={(genre) => setSearchData(prev => ({...prev, genre}))}
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
