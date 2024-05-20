import {createContext, useContext, useEffect, useState} from "react";
import {Alert} from "react-native";
import {
    fetchAddFavorite,
    fetchAuth,
    fetchAuthMe,
    fetchAuthUpdate,
    fetchDeleteUser, fetchRemoveFavorite,
    fetchSignup,
    logout as fetchLogout
} from "../store/slices/authSlice";
import {useDispatch} from "react-redux";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({children}) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // react on token changes
    useEffect(() => {
        loadUser().then(r => setLoading(false))
    }, [dispatch])

    const loadUser = async () => {
        try {
            console.log('Loading user...')
            const data = await dispatch(fetchAuthMe()).unwrap()
            const user = data.token ? data : null
            setUser(user)
            console.log('User loaded:', user.username)
        } catch (error) {
            setUser(null)
            console.log(error)
        }
    }

    const signup = async (form) => {
        try {
            console.log('Signing up...')
            const user = await dispatch(fetchSignup(form)).unwrap()
            setUser(user)
            console.log('User signed up:', user.username)
            return user
        } catch (error) {
            console.log(error)
            Alert.alert('Signup Failed', error.message)
        }
    }

    const login = async (form) => {
        try {
            console.log('Logging in...')
            const user = await dispatch(fetchAuth(form)).unwrap()
            setUser(user)
            console.log('User logged in:', user.username)
            return user
        } catch (error) {
            console.log(error)
            Alert.alert('Login Failed', error.message)
        }
    }

    const logout = async () => {
        try {
            console.log('Logging out...')
            setUser(null)
            await dispatch(fetchLogout())
            console.log('User logged out')
        } catch (error) {
            console.log(error)
            Alert.alert('Logout Failed', error.message)
        }
    }

    const update = async (form) => {
        try {
            console.log('Updating user...')
            const user = await dispatch(fetchAuthUpdate(form)).unwrap()
            setUser(user)
            console.log('User is updated:', user.username)
            return user
        } catch (error) {
            console.log(error)
            Alert.alert('Update Failed', error.message)
        }
    }

    const deleteUser = async () => {
        try {
            console.log('Deleting user...')
            await dispatch(fetchDeleteUser(user))
            setUser(null)
            console.log('User is deleted')
        } catch (error) {
            console.log(error)
            Alert.alert('Delete Failed', error.message)
        }
    }

    const addFavorite = async (movieId) => {
        const user = await dispatch(fetchAddFavorite(movieId)).unwrap()
        setUser(user)
    }

    const removeFavorite = async (movieId) => {
        const user = await dispatch(fetchRemoveFavorite(movieId)).unwrap()
        setUser(user)
    }

    if (loading) {
        return null
    }

    return (
        <AuthContext.Provider
            value={{
                user: user,
                signup: signup,
                login: login,
                logout: logout,
                updateUser: update,
                deleteUser: deleteUser,
                addFavorite: addFavorite,
                removeFavorite: removeFavorite
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;