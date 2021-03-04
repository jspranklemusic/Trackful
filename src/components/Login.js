import React from 'react'
import styled from 'styled-components'
import {motion, AnimatePresence  } from 'framer-motion'

const Div = styled.div`
    width:70%;
    background:var(--color-secondary);
    border-radius:0.5rem;
    margin:auto;
    max-width:500px;
    text-align:center;
    margin-top:1rem;
    color:var(--color-secondary-semidark);

    & h2{
        padding:0.5rem;
    }

    & input{
        font-size:1rem;
        border:none;
        outline:none;
        padding:0.5rem;
        width:80%;
        margin:0.5rem 0;
        transition:0.2s;
        &:focus{
            background:pink;
        }
    }

    & button{
        border:none;
        border-radius:5px;
        font-size:1rem;
        margin:0.5rem;
        padding:0.5rem 1rem;
        background:var(--color-secondary-semidark);
        color:rgba(255,255,255,0.55);
        cursor:pointer;
        transition:0.15s;


        &:hover{
            opacity:0.7;
        }
    }
`

const Login = props=>
<motion.div
initial={{opacity:0, y:50}}
animate={{opacity:1, y:0}}
exit={{opacity:0, y:-50}}
transition={{
    type: "spring",
    stiffness:260,
    damping:20,
    duration:0,
    delay:0.25
}}
><Div>{props.children}</Div></motion.div>


export default Login