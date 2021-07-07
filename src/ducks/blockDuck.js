import Duck from "extensible-duck"

export default new Duck({
  namespace: 'block',
  store: 'block',
  types: ['ADD_BLOCK'],
  initialState: { block: [] },
  reducer: (state, action, duck) => {
    // Descobrir qual é a action que eu estou recebendo
    // Aplicar no state o efeito dessa action
    // Retornar esse novo state
    // Caso não conheça essa action, retorno o state atual
    
    if (action.type === duck.types.ADD_BLOCK) {
      const block = { index: action.index, timestamp: action.timestamp, data: action.data, previousHash: action.previousHash, hash: action.hash, nonce: action.nonce}
      return { block: [ state.block, block ] }
    } else {
      return state;
    }
  },
  creators: (duck) => ({
    addBlock: (index,timestamp,data,previousHash,hash,nonce) => ({
      type: duck.types.ADD_BLOCK, index,timestamp,data,previousHash,hash,nonce
    })
  })
})
