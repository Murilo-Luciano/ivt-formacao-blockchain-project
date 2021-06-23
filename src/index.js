//const Block = require("./block")
//const Blockchain = require("./blockchain")
import Blockchain from './blockchain'
import Block from './block'
import css from "./style.css";

const table = document.getElementById("mytable")



let myblockchain = new Blockchain()

document.getElementById("myform").onsubmit = function(event){
    event.preventDefault()

    var date = document.getElementById("date").value
    var amountnum = document.getElementById("amount").value

    myblockchain.addBlock(new Block(date, { amount: amountnum }))

    const newrow = document.createElement("tr")
    newrow.innerHTML = `
    <tr>
        <td>${myblockchain.chain.length}}</td>
        <td>${date}</td>
        <td>${amountnum}</td>
        <td>${myblockchain.lastHash}</td>
        <td>${myblockchain.difficulty}</td>
    </tr>`
    table.appendChild(newrow)

    document.getElementById("date").value = ""
    document.getElementById("amount").value = ""
}
