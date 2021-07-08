import { createStore, combineReducers } from "redux"

import blockchainDuck from "./blockchainDuck"
import blockDuck from "./blockDuck"


const reducers = combineReducers({
    [blockchainDuck.store]: blockchainDuck.reducer,
    [blockDuck.store]: blockDuck.reducer
})

const store = createStore(reducers)


export default store
