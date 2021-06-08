const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index = '', previousHash = '', data, timestamp){
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
            newBlock.index = this.chain.length
            newBlock.previousHash = '0'
            newBlock.hash = newBlock.calculateHash()
            this.chain.push(newBlock)
        }
        else{
            newBlock.index = this.chain.length
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

/* CONSOLE.LOGs       APAGAR ANTES DO COMMIT        */

let runtest = new Blockchain()
console.log("Mining Block 1.....")
runtest.addBlock(new Block(1, "02/25/2021", { amount: 200 }))

console.log("Mining Block 2.....")
runtest.addBlock(new Block(2, "03/10/2021", { amount: 26 }))


console.log("Mining Block 3.....")
runtest.addBlock(new Block(3, "03/11/2021", { amount: 52 }))
console.log("Mining Block 4.....")
runtest.addBlock(new Block(4, "03/12/2021", { amount: 68 }))
console.log("Mining Block 5.....")
runtest.addBlock(new Block(5, "03/13/2021", { amount: 78 }))
console.log("Mining Block 6.....")
runtest.addBlock(new Block(6, "03/14/2021", { amount: 44 }))



console.log(JSON.stringify(runtest, null, 4))