const mocha = require('mocha')
const chai = require('chai')
const block = require('../src/block')
const blockchain = require('../src/blockchain')
const { expect } = require('chai')

describe("Testing Blockchain modules", function(){
    
    test_blockchain = new blockchain()
    test_blockchain.addBlock(new block("02/25/2021", { amount: 0 }))

    describe("Blockchain creation", function(){
        it("Should be of type object", function(){
            chai.expect(test_blockchain).to.be.a('Object')
        })

        it("Should have a chain object", function(){
            chai.expect(test_blockchain).to.haveOwnProperty('chain')
        })

        it("Should have a difficulty attribute", function(){
            chai.expect(test_blockchain).to.haveOwnProperty('difficulty')
        })

        it("Should populate chain object with blocks", function(){
            chai.expect(test_block.chain).to.be.not.a('null')
        })
    
        it("Should create genesis block (index = 0)", function(){
            chai.expect(test_blockchain.chain[0].index).to.be.equal(0)
        })
        
        it("Should create genesis block (previousHash = 0)", function(){
            chai.expect(test_blockchain.chain[0].previousHash).to.be.equal('0')
        })
    })

    describe("Blockchain validation",function(){
        it("Should validate the chain",function(){
            chai.expect(test_blockchain.chainValidation()).to.be.true
        })
    })

 
    describe("Blockchain difficulty",function(){
        test_blockchain.addBlock(new block("02/26/2021", { amount: 42 }))
        
        it("Should have standard difficulty equals to chain size",function(){
            chai.expect(test_blockchain.difficulty).to.be.equal(test_blockchain.chain.length-1)
        })
    
        it("Should have custom difficulty equals to value passed",function(){
            alt_difficulty = 1
            test_blockchain.addBlock(new block("02/27/2021", { amount: 42 }),alt_difficulty)
            chai.expect(test_blockchain.difficulty).to.be.equal(alt_difficulty)
        })
    })
})
