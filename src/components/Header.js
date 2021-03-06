import React, {useState} from 'react'
import styled from 'styled-components'
import clockIcon from '../assets/alarm-clock.svg'
import paintIcon from '../assets/paint-palette.svg'
import { useDispatch } from 'react-redux'

import * as types from '../store/actions'

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

const ColorPalette = styled.div`
    width:200px;
    position:relative;
    top:0;
    margin:1rem auto;
    padding:0;
    margin-top:-0.5rem;
    background:transparent;
    transition:0.3s;
    overflow:hidden;
    box-sizing:border-box;
    display:flex;
    

    & div{
        height:39px;
        margin-top:1px;
        width:40px;
        cursor:pointer;

        &:active{
            opacity:0.8;
        }
    }

    & .crayon{
        background:#e97878;
    }
    & .dark{
        background:#6e6e6e;
    }
    & .forest{
        background:#206932;
    }
    & .modern{
        background:#1f4ca0;
    }
    & .ocean{
        background:#499ead;
    }

    
    
`

const IMG = styled.img`
    width:1.75rem;
    height:1.75rem;
    display:block;
    margin:auto;
    margin-bottom:1rem;
    cursor:pointer;
    transition:0.3s;
`

const Header = props =>{
    const dispatch = useDispatch()
    const [colorShown, toggleColorShown] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [paletteStyle, setPaletteStyle] = useState({height:1})


    const showColorChange = ()=>{
        if(colorShown){
            setRotation(0)
            toggleColorShown(false)
            setPaletteStyle({height:1})
        }else{
            setRotation(90)
            toggleColorShown(true)
            setPaletteStyle({height:40})

        }
    }

    return(<div>
       
        <H1><img src={clockIcon} style={{width:'3rem',marginRight:'0.5rem'}} alt="clock icon"/> Trackful</H1>
        
        <div style={{position:'relative',width:'100%'}}>
        <IMG style={{transform:`rotateZ(${rotation}deg)`}} onClick={showColorChange} src={paintIcon} alt="svg-icon"/>
        <ColorPalette style={
            {
                height:paletteStyle.height+'px',
                opacity:paletteStyle.opacity
            }}>
                <div onClick={() => dispatch({ type: types.CRAYON })} className="crayon"></div>
                <div onClick={() => dispatch({ type: types.DARK })} className="dark"></div>
                <div onClick={() => dispatch({ type: types.FOREST })} className="forest"></div>
                <div onClick={() => dispatch({ type: types.MODERN })} className="modern"></div>
                <div onClick={() => dispatch({ type: types.OCEAN })} className="ocean"></div>
            </ColorPalette>
        </div>
        
        
    

        {/* <EM>A simple time tracker. It's good to keep tabs on things.</EM> */}

    </div>)
}

export default Header