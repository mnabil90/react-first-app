import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addOne, subOne, addSome, subSome, reset } from '../../actions/count.actions';


function Counter() {
    const dispatch = useDispatch()
    const count = useSelector(state => {
        return state.counter.count;
    })
  return (
    <>
      <p>Count is: {count}</p>

        <div>
        <button onClick={() => dispatch(addOne())}>Add 1</button>
        
        <button onClick={() => dispatch(subOne())}>Decrease 1</button>

        <button onClick={() => dispatch(addSome(10))}>Add 10</button>
        <button onClick={() => dispatch(subSome(10))}>Decrease 10</button>

        <button onClick={() => dispatch(reset())}>Reset count</button>
        </div>
    </>
  )
}

export default Counter

