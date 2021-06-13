const mocha = require('mocha')
const chai = require('chai')
const block = require('../src/block')
const blockchain = require('../src/blockchain')

describe("Testing Blockchain modules", function(){
    
    test_blockchain = new blockchain()

    describe("Block creation", function(){
        it("Should be of type object", function(){
            chai.expect(test_block).to.be.a('Object')
        })

        it("Should populate data", function(){
            chai.expect(test_block.data.amout).to.be.equal(40)
        })
    })

    describe("Hash creation", function(){
        it("Hash should not be of type null", function(){
            chai.expect(test_block.hash).to.not.be.a('null')
        })
    })

    describe("Block mining", function(){
        it("Mined block should match block hash",function(){
            chai.expect(mined_block_2).to.have.string(test_block.hash)
        })
    })

    describe("Mining difficulty shoud be variable", function(){
        
        it("Start with one 0 when difficulty equal 1",function(){
            chai.expect(mined_block_1).to.be.match(/^[0]/g)
        })

        it("Start with two 0s when difficulty equal 2",function(){
            chai.expect(mined_block_2).to.be.match(/^[0]{2}/g)
        })
    })


})