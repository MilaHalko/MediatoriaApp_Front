import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params, {rejectWithValue}) => {
    try {
        const {data} = await axios.post('/auth/login', params)
        await AsyncStorage.setItem('token', data.token)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

export const fetchSignup = createAsyncThunk('auth/fetchSignup', async (params,{rejectWithValue}) => {
    try {
        const {data} = await axios.post('/auth/signup', params)
        await AsyncStorage.setItem('token', data.token)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me')
    return data
})

const initialState = {
    data: null,
    status: "loading"
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            AsyncStorage.removeItem('token')
                .then(() => {
                    console.log('User logged out')
                })
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(fetchAuth.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.data = null
                state.status = 'error'
            })

            // Get user data
            .addCase(fetchAuthMe.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.data = null
                state.status = 'error'
            })

            // Signup
            .addCase(fetchSignup.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchSignup.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchSignup.rejected, (state) => {
                state.data = null
                state.status = 'error'
            })
    }
})

export const selectAuth = (state) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions