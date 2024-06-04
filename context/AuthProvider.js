import {createContext, useContext, useEffect, useState} from "react";
import {Alert} from "react-native";
import {
    fetchAddFavorite,
    fetchAuth,
    fetchAuthMe,
    fetchAuthUpdate,
    fetchDeleteUser,
    fetchRemoveFavorite,
    fetchSignup,
    logout as fetchLogout
} from "../store/slices/authSlice";
import {useDispatch} from "react-redux";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthContextProvider({children}) {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, [dispatch]);

    const loadUser = async () => {
        setLoading(true);
        try {
            console.log('Loading user...');
            const data = await dispatch(fetchAuthMe()).unwrap();
            const user = data.token ? data : null;
            setUser(user);
            console.log('User loaded:', user?.username);
        } catch (error) {
            setUser(null);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (form) => {
        setLoading(true);
        try {
            console.log('Signing up...');
            const user = await dispatch(fetchSignup(form)).unwrap();
            setUser(user);
            console.log('User signed up:', user.username);
            return user;
        } catch (error) {
            console.log(error);
            Alert.alert('Signup Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (form) => {
        setLoading(true);
        try {
            console.log('Logging in...');
            const user = await dispatch(fetchAuth(form)).unwrap();
            setUser(user);
            console.log('User logged in:', user.username);
            return user;
        } catch (error) {
            console.log(error);
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            console.log('Logging out...');
            setUser(null);
            await dispatch(fetchLogout());
            console.log('User logged out');
        } catch (error) {
            console.log(error);
            Alert.alert('Logout Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const update = async (form) => {
        setLoading(true);
        try {
            console.log('Updating user...');
            const user = await dispatch(fetchAuthUpdate(form)).unwrap();
            setUser(user);
            console.log('User is updated:', user.username);
            return user;
        } catch (error) {
            console.log(error);
            Alert.alert('Update Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async () => {
        setLoading(true);
        try {
            console.log('Deleting user...');
            await dispatch(fetchDeleteUser(user));
            setUser(null);
            console.log('User is deleted');
        } catch (error) {
            console.log(error);
            Alert.alert('Delete Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const addFavorite = async (movieId) => {
        setLoading(true);
        try {
            const user = await dispatch(fetchAddFavorite(movieId)).unwrap();
            setUser(user);
        } catch (error) {
            console.log(error);
            Alert.alert('Add Favorite Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (movieId) => {
        setLoading(true);
        try {
            const user = await dispatch(fetchRemoveFavorite(movieId)).unwrap();
            setUser(user);
        } catch (error) {
            console.log(error);
            Alert.alert('Remove Favorite Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    // if (loading) return null;

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                login,
                logout,
                loading,
                updateUser: update,
                deleteUser,
                addFavorite,
                removeFavorite
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
