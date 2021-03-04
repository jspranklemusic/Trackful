import React from 'react'
import styled from 'styled-components'
import clockIcon from '../assets/alarm-clock.svg'

const H1 = styled.h1`
    font-size:3rem;
    text-align:center;
    margin:0;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:1rem;
    padding:0;
`

const EM = styled.p`
    margin:0;
    text-align:center;
    max-width:400px;
    box-sizing:border-box;
    padding:0rem 1rem 1rem 1rem;
    margin:auto;
    transform:skewX(-10deg);
    font-weight:400;
    color:rgba(0,0,0,0.700);

`

const Header = props =>{
    return(<div>
       
        <H1><img src={clockIcon} style={{width:'3rem',marginRight:'0.5rem'}} alt="clock icon"/> Trackful</H1>
        

        {/* <EM>A simple time tracker. It's good to keep tabs on things.</EM> */}

    </div>)
}

export default Header