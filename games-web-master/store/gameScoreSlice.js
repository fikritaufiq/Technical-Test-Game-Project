import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchCurrentUser} from "../services/firebase";
import {db} from '../services/firebase'


export const submitGameScore = createAsyncThunk(
    'gameScore/submitGameScore',
    async ({gameId, score}, thunkAPI) => {
        try {
            let user = fetchCurrentUser()
            await db.collection('user_game_histories').add({
                gameId,
                score,
                user_id: user.uid,
                created_at: new Date(),
            })
        } catch (e) {
            console.log('Error', e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const gameScoreSlice = createSlice({
    name: 'gameScore',
    initialState: {
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

    }
})

export default gameScoreSlice.reducer

export const { clearState } = gameScoreSlice.actions;
export const gameScoreSelector = (state) => state.gameScore;