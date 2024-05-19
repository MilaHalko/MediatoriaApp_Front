const MovieItems = ({movie}) => {
    let genres = movie.genre_ids && GetMovieGenres(movie)

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                {
                    genres?.map((genre, index) => (
                        <div key={index} className={`flex gap-2`}>
                            <h3 className="text-sm font-medium">{genre}</h3>
                            {index < genres.length - 1 && <span key={index} className="text-sm font-medium">/</span>}
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-subMain w-3 h-3"/>
                <span className="text-sm font-medium">{movie?.release_date}</span>
            </div>
        </div>
    )
}

export default MovieItems
