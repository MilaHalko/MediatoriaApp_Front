import {createContext, useContext, useEffect, useState} from "react";
import {
    fetchAddFavorite,
    fetchAuth,
    fetchAuthMe,
    fetchAuthUpdate,
    fetchDeleteCurrentUser, fetchIsAdmin,
    fetchRemoveFavorite,
    fetchSignup, fetchUsers,
    logout as fetchLogout
} from "../store/slices/authSlice";
import {useDispatch} from "react-redux";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../api/axios";

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

    const isAdmin = async () => {
        setLoading(true);
        const isAdmin = await dispatch(fetchIsAdmin()).unwrap();
        setLoading(false);
        return isAdmin;
    }

    const deleteUser = async () => {
        setLoading(true);
        await dispatch(fetchDeleteCurrentUser(user));
        setUser(null);
        setLoading(false);
    };

    const deleteUserById = async (id) => {
        setLoading(true);
        await axios.delete(`/user/${id}`);
        setLoading(false);
    }

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

    const loadUsers = async () => {
        setLoading(true);
        const users = await dispatch(fetchUsers()).unwrap();
        setLoading(false);
        return users;
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
                deleteUserById,
                isAdmin,
                addFavorite,
                removeFavorite,
                loadUsers
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
