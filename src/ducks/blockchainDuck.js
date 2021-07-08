import Duck from "extensible-duck"

export default new Duck({
  namespace: 'blockchain',
  store: 'blockchain',
  types: ['ADD_BLOCKCHAIN'],
  initialState: { blockchain: [] },
  reducer: (state, action, duck) => {
    // Descobrir qual é a action que eu estou recebendo
    // Aplicar no state o efeito dessa action
    // Retornar esse novo state
    // Caso não conheça essa action, retorno o state atual
    
    if (action.type === duck.types.ADD_BLOCKCHAIN) {
      const blockchain = { chain: action.chain, difficulty: action.difficulty, lastHash: action.lastHash }
      return { blockchain: [ ...state.blockchain, blockchain ] }
    } else {
      return state;
    }
  },
  creators: (duck) => ({
    addBlockchain: (chain, difficulty,lastHash) => ({
      type: duck.types.ADD_BLOCKCHAIN, chain, difficulty,lastHash
    })
  })
})
