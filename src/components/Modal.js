import React from 'react'
import styled from 'styled-components'
import {motion, AnimatePresence  } from 'framer-motion'

const Div = styled.div`
width:85%;
margin:2rem auto;
text-align:center;
max-width:600px;
box-sizing:border-box;
padding:1rem;
background:var(--color-secondary);
border-radius:0.5rem;
color:var(--color-secondary-semidark);

& input{
    font-size:1rem;
    padding:0.25rem;
    width:100%;
    margin:1rem 0;
    border:none;
    transition:0.2s;
    outline:none;
    &:focus{
        background:var(--color-secondary-light);
    }
}

`

const Button = styled.button`
    border:none;
    border-radius:5px;
    font-size:1rem;
    margin:0.5rem;
    padding:0.5rem 1rem;
    background:var(--color-secondary-semidark);
    color:rgba(255,255,255,0.55);
    cursor:pointer;

    &:hover{
        opacity:0.7;
    }

`

const Modal = props => {

    const changePassword = async (e)=>{
        e.preventDefault();
        fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}users/${props.userID}.json`,{
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                username:props.username,
                password:props.password
            })
        }).then(data=>{
            props.viewPasswordChange()
        }).catch(error=>{
            console.log(error)
        })
    }

    return(
    <motion.div
    initial={{x:200}}
    animate={{x:0}}
    >
    <Div>
        <h3>New Password:</h3>
        <form onSubmit={changePassword}>
        <input onChange={e=>props.setPassword(e.target.value)} type="password"/>
        <Button type="submit" onClick={changePassword}>Change Password</Button>
        </form>
    </Div>
    </motion.div>
    )
}

export default Modal