import React from 'react'

function Product(props) {
  let product = props.product;
  return (
    <tr key={product.id}>
        {/* <td>{todo.id}</td> */}
        <td>{product.productName}</td>
        <td>{product.productPrice}</td>
        <td>{product.quantity}</td>
        <td><button className="btn btn-success" onClick={(e) => props.modifyQuantity(product.id,1)}>Add</button></td>
        <td><button className="btn btn-success" onClick={() => props.modifyQuantity(product.id,-1)}>Minus</button></td>
        <td><button className="btn btn-warning" onClick={() => props.handleDelete(product.id)}>Delete</button></td>
    </tr>
  )
}

export default Product