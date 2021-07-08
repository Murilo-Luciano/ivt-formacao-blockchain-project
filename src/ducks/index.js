import { createStore, combineReducers } from "redux"

import blockchainDuck from "./BlockchainDuck"
import blockDuck from "./BlockDuck"


const reducers = combineReducers({
    [blockchainDuck.store]: blockchainDuck.reducer,
    [blockDuck.store]: blockDuck.reducer
})

const store = createStore(reducers)


export default store
