import React from 'react'

function CartSummary(props) {
  const {totalAmount,totalQuantity} = props.cartState;
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