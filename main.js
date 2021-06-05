const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, previousHash = '', data, timestamp){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash(){
        return SHA256(this.previousHash + this.nonce + JSON.stringify(this.data) + this.timestamp).toString()
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++
            this.hash = this.calculateHash()
        }

        console.log("Block mined => " + this.hash)
    }

}

class Blockchain{
    constructor(){
        this.chain = [/*empty*/]
        this.difficulty = 4 // DIFFICULTY LEVEL (Should be variable)
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        // if chain is empty => Transform newBlock into GenesisBlock (Previous Hash = 0)
        if(this.chain.length == 0){
            newBlock.previousHash = '0'
            newBlock.hash = newBlock.calculateHash()
            this.chain.push(newBlock)
        }
        else{
            newBlock.previousHash = this.getLatestBlock().hash
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