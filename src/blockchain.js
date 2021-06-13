class Blockchain{
    constructor(){
        this.chain = [/*empty*/]
        this.difficulty = null // DIFFICULTY LEVEL (Should be variable)
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock,dif=0){
        // if chain is empty => Transform newBlock into GenesisBlock (Previous Hash = 0)
        if(this.chain.length == 0){
            newBlock.index = this.chain.length
            newBlock.previousHash = '0'
            newBlock.hash = newBlock.calculateHash()
            this.chain.push(newBlock)
        }
        else if(dif !=0){
            newBlock.index = this.chain.length
            newBlock.previousHash = this.getLatestBlock().hash
            this.difficulty = dif
            newBlock.mineBlock(this.difficulty)
            this.chain.push(newBlock)
        }
        else{
            newBlock.index = this.chain.length
            newBlock.previousHash = this.getLatestBlock().hash
            this.difficulty = this.chain.length
            newBlock.mineBlock(this.difficulty)
            this.chain.push(newBlock)
        }

    }

    chainValidation(){
        // Go through the chain and checks each hash integrity
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false
            }

        }
        return true
    }
}
module.exports = Blockchain