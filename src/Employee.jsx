import React from 'react'
import { useSearchParams } from 'react-router-dom'

function Employee() {
    const[searchParams] = useSearchParams();
    const isAdmin = searchParams.get('isAdmin');
  return (
    <div>{`Employee ${isAdmin}`}</div>
  )
}

export default Employee