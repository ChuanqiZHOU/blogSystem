import axios from 'axios'
import React, { useEffect, useState}from 'react'
import { Pagination } from 'react-bootstrap'
import styles from './index.module.css'
const TablePagi = (props) => {
    const { currentKey, total } = props;
    const [activeState, setActiveState] = useState(1)
    const [pagiPreState, setPagiPreState] = useState(true);
    const [pagiNextState, setPagiNextState] = useState()
    const [userListState, setUserList] = useState()

    const [pagiPreStyle, setPagiPreStyle] = useState()
    const [pagiNextStyle, setPagiNextStyle]= useState({cursor:'pointer'})
    // each item's onClick event
    const pagiItemClick = async(props) => {
        setActiveState(props)       
        // const result = await axios.get('${SERVERHTTP}/admin', {
        //   params: { page: props},
        // })
    }

   // set pagipre and paginext disabed     
    useEffect(() => {
        const pagiScan = () => {
            if (activeState === 1) {
                setPagiPreState(true)
                setPagiPreStyle({ cursor: 'not-allowed' })
                setPagiNextStyle({ cursor: 'pointer' })
            } else if (activeState === total*1) {
                setPagiNextState(true)
                setPagiNextStyle({ cursor: 'not-allowed' })
                 setPagiPreState(false)
                setPagiPreStyle({ cursor: 'pointer' })
            } else {
                setPagiPreState(false)
                setPagiPreStyle({ cursor: 'pointer' })
                setPagiNextState(false)
                setPagiNextStyle({ cursor: 'pointer' })
            }
        };
        pagiScan();
        currentKey(activeState);
    },[activeState,pagiPreState])
    
   // previous and nex button's click event
    const pagiPreClick = async() => {
        if (activeState > 1){
            // const result = await axios.get('${SERVERHTTP}/admin', {
            //   params: { page: activeState*1 - 1 },
            // })
            
       
        setActiveState(activeState=>activeState*1-1) }
    }
    const pagiNextClick = async () => {
      if (activeState <total) {
        // const result = await axios.get('${SERVERHTTP}/admin', {
        //   params: { page: activeState * 1 + 1 },
        // })
     
      setActiveState((activeState) => activeState * 1 + 1) }
    }

    let items = []
    for (let number = 1; number <= props.total; number++) {
      items.push(
          <Pagination.Item key={number} active={number === activeState} onClick={()=> pagiItemClick(number)}>
          {number}
        </Pagination.Item>
      )
    }
    
   
    // console.log(activeState)
    return (
      <Pagination>
            <Pagination.Prev style={pagiPreStyle} disabled={pagiPreState} onClick={pagiPreClick}/>
            {items}
            <Pagination.Next style={pagiNextStyle} disabled={pagiNextState}
                onClick={() => {pagiNextClick()} }/>
      </Pagination>
    )
}

export default TablePagi