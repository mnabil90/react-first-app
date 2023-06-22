import React from 'react'

function Button({text,disabled,className,increment,onIncrement}) {
  return (
    <div>
        <button className={className} disabled={disabled} onClick={()=>{onIncrement(increment)}}>{`${text}`}</button>
    </div>
  )
}

export default Button