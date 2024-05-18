import {createContext, useContext, useEffect, useState} from "react";
import {Alert} from "react-native";
import {fetchAuth, fetchAuthMe, fetchSignup, logout as fetchLogout} from "../store/slices/authSlice";
import {useDispatch} from "react-redux";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({children}) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;