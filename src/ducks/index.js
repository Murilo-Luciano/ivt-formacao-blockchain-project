import { createStore, combineReducers } from "redux"

import blockchainDuck from "./blockchainDuck"


const reducers = combineReducers({
    [blockchainDuck.store]: blockchainDuck.reducer,
})

const store = createStore(reducers)


export default store
