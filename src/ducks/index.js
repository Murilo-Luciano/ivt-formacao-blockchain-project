import { createStore, combineReducers } from "redux"

import blockchainDuck from "./BlockchainDuck"


const reducers = combineReducers({
    [blockchainDuck.store]: blockchainDuck.reducer,
})

const store = createStore(reducers)


export default store
