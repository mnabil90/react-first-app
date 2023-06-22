import React from 'react'

function CartSummary(props) {
  const {totalAmount,totalQuantity} = props.cartState;
  return (
    <>
        <div>{`Amount : ${totalAmount}`}</div>
        <div>{`Quantity : ${totalQuantity}`}</div>
    </>
  )
}

export default CartSummary