import { Button } from '@mui/material';
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function About() {
  const params = useParams();
  const navigate  = useNavigate();
  return (
    <>
       <div>Welcome To my Website</div>
        <br/>
        <Link to='/Home'>Home</Link>
    </>
  )
}

export default About