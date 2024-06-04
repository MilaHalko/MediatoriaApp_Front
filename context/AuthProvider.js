import {createContext, useContext, useEffect, useState} from "react";
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
        const user = await dispatch(fetchSignup(form)).unwrap();
        setUser(user);
        setLoading(false);
    };

    const login = async (form) => {
        setLoading(true);
        const user = await dispatch(fetchAuth(form)).unwrap();
        setUser(user);
        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);
        setUser(null);
        await dispatch(fetchLogout());
        setLoading(false);
    };

    const update = async (form) => {
        setLoading(true);
        const user = await dispatch(fetchAuthUpdate(form)).unwrap();
        setUser(user);
        setLoading(false);
    };

    const deleteUser = async () => {
        setLoading(true);
        await dispatch(fetchDeleteUser(user));
        setUser(null);
        setLoading(false);
    };

    const addFavorite = async (movieId) => {
        setLoading(true);
        const user = await dispatch(fetchAddFavorite(movieId)).unwrap();
        setUser(user);
        setLoading(false);
    };

    const removeFavorite = async (movieId) => {
        setLoading(true);
        const user = await dispatch(fetchRemoveFavorite(movieId)).unwrap();
        setUser(user);
        setLoading(false);
    };


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
