import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {
    fetchCurrentUser,
    fetchUserProfile,
    logout, onAuthStateChanged,
    signInWithEmailAndPassword
} from "../services/firebase";

export const checkSession = createAsyncThunk(
  'users/checkSession',
    async (nil,  thunkAPI) => {
        try {
            await fetchCurrentUser()
        } catch (e) {
            console.log('Error', e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/login',
    async ({email, password}, thunkAPI) => {
        try {
            await signInWithEmailAndPassword(email, password)
        } catch (e) {
            console.log('Error', e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'users/logoutUser',
    async (nil, thunkAPI) => {
        try {
            await logout()
        } catch (e) {
            console.log('Error', e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const storeUserProfile = createAsyncThunk(
    'users/storeUserProfile',
    async (nil, thunkAPI) => {
        try {
            return await fetchUserProfile()
        } catch (e) {
            console.log('Error', e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        username: '',
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
        isLoggedIn: false,
        name: '',
        bio: '',
        profilePhoto: '',
        playedGames: {},
    },
    reducers: {
        clearState: (state) => {
            console.log("CLEAR STATE")
            state.isError = false;
            state.isSuccess = false;
            state.isLoggedIn = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkSession.fulfilled, (state) => {
            console.log("FULFILLED CHECKSESSION")
            storeUserProfile()
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.isLoading = false;
        })
        builder.addCase(checkSession.rejected, (state, action) => {
            console.log("REJECTED")
            state.isLoggedIn = false;
            state.isLoading = false;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log("FULFILLED")
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.isLoading = false;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log("REJECTED")
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload;
        })
        builder.addCase(loginUser.pending, (state, action) => {
            console.log("PENDING")
            state.isLoading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        })
        builder.addCase(storeUserProfile.fulfilled, (state, action) => {
            console.log("PAYLOAD", action)
            state.email = action.payload.email
            state.username = action.payload.username
            state.name = action.payload.name
            state.bio = action.payload.bio
            state.profilePhoto = action.payload.profilePhoto
            state.playedGames = action.payload.playedGames
        })
    }
})

export default userSlice.reducer

export const {clearState} = userSlice.actions;
export const userSelector = (state) => state.user;