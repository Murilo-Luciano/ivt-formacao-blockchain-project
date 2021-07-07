import React from 'react';
import { connect } from "react-redux"
import styles from '../assets/style.css';
import block from '../services/block.js';
import blockDuck from '../ducks/blockDuck';

const Form = ({blockDuck, block}) => {
    return(
        <div className={styles.container}>
            <label id="mytitle">Insira seu bloco</label>
                <form id="myform" className={styles.myForm}>
                <label for="date">Date:</label><br/>
                <input className={styles.myinput, styles.input-container} type="date" placeholder="dd-mm-yyyy" id="date" name="date"/><br></br>
                <label for="amount">Amount:</label><br/>
                <input className={styles.myinput} type="number" step="0.01" id="amount" placeholder="$" name="amount"/><br></br>
                <input className={styles.mybtn} type="submit" value="Submit"/>
            </form>
        </div>
    );
}

const MapStatetoProps = (store) =>{
    
}

export default connect(MapStatetoProps, MapDispatchToProps)(Form);