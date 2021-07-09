import Duck from "extensible-duck"
import Blockchain from "../services/blockchain"
import Block from "../services/block"

export default new Duck({
  namespace: 'blockchain',
  store: 'blockchain',
  types: ['ADD_BLOCKCHAIN'],
  initialState: { blockchain: new Blockchain() },
  reducer: (state, action, duck) => {
    // Descobrir qual é a action que eu estou recebendo
    // Aplicar no state o efeito dessa action
    // Retornar esse novo state
    // Caso não conheça essa action, retorno o state atual
    
    if (action.type === duck.types.ADD_BLOCKCHAIN) {
      const block = new Block(action.timestamp, {amount: action.data})
      block.data = action.data
      block.timestamp = action.timestamp
      state.blockchain.addBlock(block)
      
      let newblockchain = new Blockchain()
      
      state.blockchain.chain.forEach((block) => {
        newblockchain.chain.push(block) 
      });

      return { blockchain:  newblockchain }
    } else {
      return state;
    }
  },
  creators: (duck) => ({
    addBlockchain: ({timestamp, data}) => ({
      type: duck.types.ADD_BLOCKCHAIN, timestamp,data
    })
  })
})
