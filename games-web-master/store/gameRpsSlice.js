import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const rpsSlice = createSlice({
    name: 'gameRPS',
    initialState: {
        round: 1,
        scores: 0,
        roundResult: ['win', 'lose'],
        result: 'VS',
        resultTag: false,
        choosenRockTag: false,
        choosenPaperTag: false,
        choosenScissorsTag: false,
        choosenComputerRockTag: false,
        choosenComputerPaperTag: false,
        choosenComputerScissorsTag: false,
        status: false,
        disableChoice: true,
        disableNext: true,
        gameStart: false,
        done: false,
        gameFinish: false,
        userChoice: ['rock','paper','scissors'],
        computerChoice: ['rock','paper','scissors'],

    },
    reducers: {
        setUserChoice: (state, action) => {
            state.userChoice = action.payload.value;
            return state;
        },
        setComputerChoice: (state, action) => {
            state.computerChoice = action.payload.randomChoice;
            return state;
        },
        startGame: (state) => {
            state.disableChoice = false;
            state.gameStart = true;
            state.status = true;
            return state;
        },
        restartGame: (state) => {
            state.choosenRockTag = false;
            state.choosenPaperTag = false;
            state.choosenScissorsTag = false;
            state.choosenComputerRockTag = false;
            state.choosenComputerPaperTag = false;
            state.choosenComputerScissorsTag = false;
            return state;
        },
        refreshGame: (state, action) => {
            state.userChoice = action.payload.user;
            state.computerChoice = action.payload.computer;
            state.result = action.payload.res;
            state.resultTag = false;
            state.disableChoice = false;
            state.round = 1;
            state.scores = 0;
            state.done = false;
            state.gameFinish = false;
            state.gameStart = false;
            state.disableNext = true;
            state.disableChoice = true;
            state.status = false;
            return state;
        },
        nextRound: (state, action) => {
            state.userChoice = action.payload.user;
            state.computerChoice = action.payload.computer;
            state.result = action.payload.res;
            state.resultTag = false;
            state.disableChoice = false;
            state.round++;
            state.disableNext = true;
            return state;
        },
        finishGame: (state, action) => {
            state.done = true;
            state.gameFinish = true;
            return state;
        },
        playerRockValue: (state) => {
            state.choosenRockTag = true;
            return state;
        },
        playerPaperValue: (state) => {
            state.choosenPaperTag = true;
            return state;
        },
        playerScissorsValue: (state) => {
            state.choosenScissorsTag = true;
            return state;
        },
        compRockValue: (state) => {
            state.choosenComputerRockTag = true;
            return state;
        },
        compPaperValue: (state) => {
            state.choosenComputerPaperTag = true;
            return state;
        },
        compScissorsValue: (state) => {
            state.choosenComputerScissorsTag = true;
            return state;
        },
        resultmatch: (state) => {
            switch (state.userChoice + state.computerChoice) {
                case 'rockscissors':
                case 'paperrock':
                case 'scissorspaper':
                    state.result = 'You WIN !';
                    state.resultTag = true;
                    state.disableNext = false;
                    state.disableChoice = true;
                    state.scores++;
                    break;
                case 'rockpaper':
                case 'paperscissors':
                case 'scissorsrock':
                    state.result = 'You Lose!';
                    state.resultTag = true;
                    state.disableNext = false;
                    state.disableChoice = true;
                    break;
                case 'rockrock':
                case 'paperpaper':
                case 'scissorsscissors':
                    state.result = 'ITS A DRAW!';
                    state.resultTag = true;
                    state.disableNext = false;
                    state.disableChoice = true;
                    break;
            }
        },
        




    },
    extraReducers: (builder) => {

    }
})

export default rpsSlice.reducer

export const {startGame, restartGame, nextRound,
    refreshGame, finishGame, setUserChoice, setComputerChoice, resultmatch,
    playerRockValue, playerPaperValue, playerScissorsValue, compRockValue, compPaperValue, compScissorsValue } = rpsSlice.actions;
export const rpsSelector = (state) => state.gameRPS;