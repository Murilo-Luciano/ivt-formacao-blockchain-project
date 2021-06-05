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
        return SHA256(this.previousHash + this.nonce + JSON.stringify(this.data) + this.timestamp)
    }


}
