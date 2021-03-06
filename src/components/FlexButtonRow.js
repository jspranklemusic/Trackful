import React from 'react'
import styled from 'styled-components'

const FlexButtonRow = styled.div`
display:flex;
width:max-content;
border-radius:5px;
max-width:85%;
margin:auto;
margin-top:0.5rem;
overflow:hidden;
& button{
    background:var(--color-primary);
    font-size:1rem;
    border:none;
    padding:0.4rem 0.8rem;
    transition:0.15s;
    cursor:pointer;

    &:hover{
        opacity:0.7;
    }
    &:active{
        opacity:0.5;
    }
}

& .blue{
    background:var(--color-blue);
    color:var(--color-blue-dark);
}
& .green{
    background:var(--color-green);
    color:var(--color-green-dark);
}
& .red{
    background:var(--color-red);
    color:var(--color-red-dark);
}
`
export default FlexButtonRow
