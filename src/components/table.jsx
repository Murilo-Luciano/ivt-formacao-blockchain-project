import React from 'react';
import styles from '../assets/style.css';

const List = (props) => {
    return(
        <table className={styles.mytable} id="mytable" style="width:30%">
            <tr>
                <th>Index</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Hash</th>
                <th>Diff</th>
            </tr>
        </table>
    );
}

export default List;