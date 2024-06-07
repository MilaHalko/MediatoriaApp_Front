import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params, {rejectWithValue}) => {
    console.log('Fetching login:', params)
    try {
        const {data} = await axios.post('/auth/login', params)
        await AsyncStorage.setItem('token', data.token)
        console.log('Fetched user logging in:', data)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

export const fetchSignup = createAsyncThunk('auth/fetchSignup', async (params, {rejectWithValue}) => {
    console.log('Fetching signing up:', params)
    try {
        const {data} = await axios.post('/auth/signup', params)
        await AsyncStorage.setItem('token', data.token)
        console.log('Fetched user signing up:', data)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (_, {rejectWithValue}) => {
    console.log('Fetching user data...')
    try {
        const {data} = await axios.get('/auth/me')
        console.log('Fetched user data:', data)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

export const fetchIsAdmin = createAsyncThunk('auth/fetchIsAdmin', async (_, {rejectWithValue}) => {
    console.log('Fetching check admin...')
    try {
        const {data} = await axios.get('/auth/is-admin')
        console.log('Fetched admin check:', data)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
});

export const fetchAuthUpdate = createAsyncThunk('auth/fetchAuthUpdate', async (params, {rejectWithValue}) => {
    console.log('Fetching update user:', params)
    try {
        const {data} = await axios.patch('/auth/me', params)
        console.log('Fetched user updating:', data)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

export const fetchDeleteUser = createAsyncThunk('auth/fetchDeleteUser', async (params, {rejectWithValue}) => {
    console.log('Fetching delete user:', params)
    try {
        await axios.delete('/auth/me', params)
        console.log('Fetched user deleting')
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

export const fetchAddFavorite = createAsyncThunk('auth/fetchAddFavorite', async (id, {rejectWithValue}) => {
    console.log('Fetching add favorite:', id)
    try {
        const {data} = await axios.post(`/auth/favorites/${id}`)
        console.log('Fetched favorite adding:', data)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

export const fetchRemoveFavorite = createAsyncThunk('auth/fetchRemoveFavorite', async (id, {rejectWithValue}) => {
    console.log('Fetching remove favorite:', id)
    try {
        const {data} = await axios.delete(`/auth/favorites/${id}`)
        console.log('Fetched favorite removing:', data)
        return data
    } catch (e) {
        return e.response.data ? rejectWithValue(e.response.data) : "Server error"
    }
})

const initialState = {
    user: null,
    status: "loading"
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            console.log('Logging out...')
            state.data = null
            AsyncStorage.removeItem('token').then(() => console.log('Token removed'))
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

            // Update user
            .addCase(fetchAuthUpdate.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchAuthUpdate.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchAuthUpdate.rejected, (state) => {
                state.data = null
                state.status = 'error'
            })

            // Delete user
            .addCase(fetchDeleteUser.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchDeleteUser.fulfilled, (state) => {
                state.data = null
                state.status = 'loaded'
            })
            .addCase(fetchDeleteUser.rejected, (state) => {
                state.data = null
                state.status = 'error'
            })

            // Add favorite
            .addCase(fetchAddFavorite.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchAddFavorite.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchAddFavorite.rejected, (state) => {
                state.data = null
                state.status = 'error'
            })

            // Remove favorite
            .addCase(fetchRemoveFavorite.pending, (state) => {
                state.data = null
                state.status = 'loading'
            })
            .addCase(fetchRemoveFavorite.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchRemoveFavorite.rejected, (state) => {
                state.data = null
                state.status = 'error'
            })
    }
})

export const selectAuth = (state) => Boolean(state.auth.data)
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions