import React from 'react';
import { connect } from "react-redux"
import styles from '../assets/style.module.css';
import BlockchainDuck from '../ducks/blockchainDuck';
import PropTypes from "prop-types";
import BlockChain from "../services/blockchain";
import Block from "../services/block";

const FormB = ({ addBlockchain, chain, difficulty, lastHash}) => {
    const [data, setData] = React.useState("")
    const [timestamp, setTimestamp] = React.useState("")

    let myBlockchain = new BlockChain()
    
    const createBlock = (data,timestamp) =>{
        var date = timestamp
        var amountNum = data
    
        if(date =="" || amountNum==""){
            alert("No fields can be empty");
            return ;
        }

        myBlockchain.addBlock(new Block(timestamp,{ amount: amountNum })) 
    }

    return(
        <>
            <div className={styles.container}>
                <label className={styles.myTitle} id="mytitle">Insira seu bloco</label>
                    <form id="myform" className={styles.myForm}>
                    <label>Date:</label><br/>
                    <input className={styles.myinput, styles.inputContainer} onChange={(evt)=> setTimestamp(evt.target.data)} type="date" placeholder="dd-mm-yyyy" id="date" name="date"/><br></br>
                    <label>Amount:</label><br/>
                    <input className={styles.myinput, styles.inputContainer}  onChange={(evt)=> setData(evt.target.amount)} type="number" step="0.01" id="amount" placeholder="$" name="amount"/><br></br>
                    <input className={styles.mybtn} type="submit" onClick={(evt)=> {
                        createBlock(data, timestamp)
                        evt.preventDefault()
                        }}/>
                </form>
            </div>
        </>
    );
}

FormB.propTypes = {
    addBlock: PropTypes.func
}

FormB.defaultProps = {
    blockchain: {},
    addBlockchain: ()=>undefined  
}

const MapStatetoProps = (store) =>({
    blockchain: store.blockchain.blockchain
})

const MapDispatchtoProps = (dispatch) =>({
    addBlockchain: ({chain,difficulty, lastHash}) => dispatch(
        BlockchainDuck.creators.addBlockchain(chain,difficulty, lastHash)
    )
})



export default connect(MapStatetoProps, MapDispatchtoProps)(FormB);