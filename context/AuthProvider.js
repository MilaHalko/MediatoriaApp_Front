import {createContext, useContext, useEffect, useState} from "react";
import {Alert} from "react-native";
import {fetchAuth, fetchAuthMe, fetchSignup} from "../store/slices/authSlice";
import {useDispatch} from "react-redux";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({children}) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser()
    }, [dispatch])

    const loadUser = async () => {
        try {
            const user = await dispatch(fetchAuthMe()).unwrap()
            setUser(user)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const signup = async (form) => {
        try {
            const user = await dispatch(fetchSignup(form)).unwrap()
            setUser(user)
            return user
        } catch (error) {
            console.log(error)
            Alert.alert('Signup Failed', error.message)
        }
    }

    const login = async (form) => {
        try {
            const user = await dispatch(fetchAuth(form)).unwrap()
            setUser(user)
            return user
        } catch (error) {
            console.log(error)
            Alert.alert('Login Failed', error.message)
        }
    }

    const logout = async () => {

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
                logout: () => {},
                deleteUser: () => {},
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;