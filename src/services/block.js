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
        return this.hash
    }

}
//module.exports = Block
export default Block