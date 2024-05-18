import React from 'react'
// import {FaHeart, FaRegHeart} from "react-icons/fa";
// import {useNavigate} from "react-router-dom";
// import {UserAuth} from "../../Context/AuthContext";
// import {MovieContextConsumer} from "../../Context/MovieContext";

function MovieLikeButton({movie, className}) {
    const {user} = UserAuth()
    const {SaveToFavorites, RemoveFromFavorites, IsInFavorites} = MovieContextConsumer()
    const [liked, setLiked] = React.useState(IsInFavorites(movie))
    const navigate = useNavigate()
    const updateIsInFavorites = (movie) => {
        const loadIsInFavorites = async (movie) => {
            const response = await IsInFavorites(movie)
            setLiked(response)
        }

        // console.log(movie?.id)
        loadIsInFavorites(movie)
    }

    updateIsInFavorites(movie)
    const handleSaveMovie = async () => {
        if (user?.email) {
            const newLiked = !liked;

            try {
                if (newLiked) {
                    await SaveToFavorites(movie);
                } else {
                    await RemoveFromFavorites(movie);
                }

                updateIsInFavorites(movie)
                // setLiked(newLiked);
            } catch (error) {
                console.error("Error updating favorites:", error);
            }
        } else {
            alert('Please login to save movie');
            navigate('/login');
        }
    };

    React.useEffect(() => {
        updateIsInFavorites(movie);
    }, [movie, updateIsInFavorites]);


    // React.useEffect(() => {
    //
    //     // const loadIsInFavorites = async (movie) => {
    //     //     const response = await IsInFavorites(movie)
    //     //     setLiked(response)
    //     // }
    //     // // if (user?.email) {
    //     // //     onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
    //     // //         doc.data()?.favoriteMovies.some((item) => item.id === movie?.id) ? setLiked(true) : setLiked(false)
    //     // //     });
    //     // // }
    //     // loadIsInFavorites(movie)
    //     // // setLiked(IsInFavorites(movie))
    //     updateIsInFavorites(movie)
    // }, [user?.email, movie, liked])

    return (
        <button onClick={handleSaveMovie}
                className={`${className} h-10 w-10 text-2xl flex-colo transitions hover:bg-transparent text-white hover:text-subMain`}>
            {
                liked ? <FaHeart className='text-red-600'/> : <FaRegHeart/>
            }
        </button>
    )
}

export default MovieLikeButton
