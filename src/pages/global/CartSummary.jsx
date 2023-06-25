import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

function CartSummary(props) {
  const cartState = useSelector((state) => {
    return state.cartState;
  });
  const {totalAmount,totalQuantity} = cartState;
  return (
    <>  
       <table>
        <tr>{`Amount : ${totalAmount}`}</tr>
        <tr>{`Quantity : ${totalQuantity}`}</tr>
       </table>
    </>
  )
}

export default CartSummary