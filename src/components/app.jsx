import React from "react"
import FormB from './FormB.jsx'
import TableB from './TableB.jsx'
import styles from '../assets/style.module.css';

const App = () => {
  return (
    <div className={styles.myconteiner}> 
      <FormB />
      <TableB />
    </div>
  )
}

export default App
