import React from 'react';
import styles from '../assets/style.module.css';

const TableB = (props) => {
    return(
        <React.Fragment>
            <table className={styles.mytable} id="mytable" style={{width:30}}>
                <tr>
                    <th>Index</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Hash</th>
                    <th>Diff</th>
                </tr>
            </table>
        </React.Fragment>
    );
}

export default TableB;