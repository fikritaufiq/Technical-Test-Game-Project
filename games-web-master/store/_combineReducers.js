import { combineReducers } from 'redux'

import user from './userSlice'
import gameRPS from './gameRpsSlice'

const reducers = combineReducers({
    user, gameRPS
})

export default reducers;