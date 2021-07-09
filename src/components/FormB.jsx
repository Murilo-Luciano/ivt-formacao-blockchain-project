import React from 'react';
import { connect } from "react-redux"
import styles from '../assets/style.module.css';
import BlockchainDuck from '../ducks/blockchainDuck';
import PropTypes from "prop-types";

const FormB = ({addBlockchain}) => {
    const [data, setData] = React.useState("")
    const [timestamp, setTimestamp] = React.useState("")
    
    const createBlock = ( data,timestamp) =>{
        if(data =="" || timestamp==""){
            alert("No fields can be empty");
            return ;
        }
        console.log('states', data, timestamp)
        addBlockchain({data,timestamp})
    }

    return(
        <>
            <div className={styles.container}>
                <label className={styles.myTitle} id="mytitle">Insira seu bloco</label>
                    <form id="myform" className={styles.myForm}>
                    <label>Date:</label><br/>
                    <input 
                        className={styles.myinput, styles.inputContainer} 
                        onChange={(evt)=> setTimestamp(evt.target.value)} 
                        type="date" 
                        placeholder="dd-mm-yyyy" 
                        id="date" 
                        name="date"/><br></br>
                    <label>Amount:</label><br/>
                    <input 
                        className={styles.myinput, styles.inputContainer}  
                        onChange={(evt)=> setData(evt.target.value)} 
                        type="number" 
                        step="0.01" 
                        id="amount" 
                        placeholder="$" 
                        name="amount"/><br></br>
                    <button className={styles.mybtn}  onClick={(evt)=> {
                        evt.preventDefault()
                        createBlock(data, timestamp)
                        }}>Submit</button>
                </form>
            </div>
        </>
    );
}

FormB.propTypes = {
    addBlockchain: PropTypes.func
}

FormB.defaultProps = {
    blockchain: {},  
}

const MapStatetoProps = () =>({
})

const MapDispatchtoProps = (dispatch) =>({
    addBlockchain: ({timestamp,data}) => dispatch(
        BlockchainDuck.creators.addBlockchain({timestamp,data})
    )
})

export default connect(MapStatetoProps, MapDispatchtoProps)(FormB);