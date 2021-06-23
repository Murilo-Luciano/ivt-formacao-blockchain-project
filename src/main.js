const Block = require('./block.js')
const Blockchain = require('./blockchain.js')

/* CONSOLE.LOGs */

let runtest = new Blockchain()
console.log("Mining Genesis.....")
runtest.addBlock(new Block("02/25/2021", { amount: 0 }))

console.log("Mining Block 2.....")
runtest.addBlock(new Block("03/10/2021", { amount: 26 }))

console.log("Mining Block 3.....")
runtest.addBlock(new Block("03/11/2021", { amount: 52 }))

console.log("Mining Block 4.....")
runtest.addBlock(new Block("03/12/2021", { amount: 68 }))

console.log("Mining Block 5.....")
runtest.addBlock(new Block("03/13/2021", { amount: 78 }))

console.log("Mining Block 6.....")
runtest.addBlock(new Block("03/14/2021", { amount: 44 }))

console.log("Mining Block 7.....")
runtest.addBlock(new Block("03/14/2021", { amount: 44 }),1)

console.log(runtest.chain.length)


console.log("\n*****BLOCKCHAIN LOG*****")
console.log(JSON.stringify(runtest, null, 5))
