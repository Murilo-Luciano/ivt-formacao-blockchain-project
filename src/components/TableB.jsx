import React from 'react';
import styles from '../assets/style.module.css';
import PropTypes from "prop-types";
import { connect } from "react-redux"

const TableB = ({blockchain}) => {
    
    return(
        <React.Fragment>
            <table className={styles.mytable} id="mytable" style={{width:30}}>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Hash</th>
                        <th>Diff</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {blockchain.chain.map((item) => {
                        return(
                            <tr>
                                {console.log(item)}
                                <td> {item.index}</td>
                                <td>{item.timestamp}</td>
                                <td> {item.data}</td>
                                <td>{item.hash}</td>
                                <td>{item.index}</td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </React.Fragment>
    );
}

TableB.propTypes = {
    blockchain : PropTypes.object,
    chain : PropTypes.array
}
TableB.defaultProps = {
    blockchain:{},
    chain:[]
}

const MapStatetoProps = (store) =>({
    blockchain: store.blockchain.blockchain
})

const MapDispatchtoProps = () =>({
})

export default connect(MapStatetoProps, MapDispatchtoProps)(TableB);