import * as types from './actions'


const initialState = {
    colorSchemes:{
        [types.CRAYON]:{
            '--color-primary':'#ffee93',
            '--color-primary-semidark': '#f5d782',
            '--color-secondary':'#e97878',
            '--color-secondary-semidark':'#9b5151',
            '--color-primary-light': '#eee7bd',
            '--color-secondary-light':'rgb(241, 188, 197)',
            '--color-white':'rgb(218, 218, 218)',
            '--color-black':'rgba(26, 26, 26, 0.815)',
            '--color-blue':'#749db8',
            '--color-green':'#80b18a',
            '--color-red':'#d34e4e',
            '--color-blue-dark':'#0b283a',
            '--color-green-dark':'#10411a',
            '--color-red-dark':'#4e1010',
        },
        [types.FOREST]:{
            '--color-primary':' #9cff93',
            '--color-primary-semidark':' #67e462',
            '--color-primary-light':' #cfeccb',
            '--color-secondary-light':'rgb(156, 204, 176)',
            '--color-secondary':'#46a85f',
            '--color-secondary-semidark':'#206932',
            '--color-white':'rgb(218, 218, 218)',
            '--color-black':'rgba(26, 26, 26, 0.815)',
            '--color-blue':'#beb09d',
            '--color-green':'#a78559',
            '--color-red':'#d34e4e',
            '--color-blue-dark':'#312e29',
            '--color-green-dark':'#38201a',
            '--color-red-dark':'#4e1010',
        },
        [types.OCEAN]:{
            '--color-primary':' #93fffa',
            '--color-primary-semidark':' #499ead',
            '--color-primary-light':' #cbebec',
            '--color-secondary-light':'rgb(223, 216, 180)',
            '--color-secondary':'#e0d7a0',
            '--color-secondary-semidark':'#857d4f',
            '--color-white':'rgb(218, 218, 218)',
            '--color-black':'rgba(26, 26, 26, 0.815)',
            '--color-blue':'#66b6ce',
            '--color-green':'#4375b8',
            '--color-red':'#e78434',
            '--color-blue-dark':'#062a33',
            '--color-green-dark':'#112f36',
            '--color-red-dark':'#552e0e',

        },
        [types.DARK]:{
            '--color-primary':' #6e6e6e',
            '--color-primary-semidark':' #1d1d1d',
            '--color-primary-light':' #4e4e4e',
            '--color-secondary-light':'rgb(180, 180, 180)',
            '--color-secondary':'#cfcfcf',
            '--color-secondary-semidark':'#818181',
            '--color-black':'rgb(218, 218, 218)',
            '--color-white':'rgba(26, 26, 26, 0.815)',
            '--color-blue':'#417496',
            '--color-green':'#458853',
            '--color-red':'#b33838',
            '--color-blue-dark':'#0b283a',
            '--color-green-dark':'#10411a',
            '--color-red-dark':'#4e1010',
        },
        [types.MODERN]:{
            '--color-primary':' #ffffff',
            '--color-primary-semidark':' #cccccc',
            '--color-primary-light':' #ffffff',
            '--color-secondary-light':'rgb(217, 230, 241)',
            '--color-secondary':'#afc2e7',
            '--color-secondary-semidark':'#1f4ca0',
            '--color-white':'rgb(218, 218, 218)',
            '--color-black':'rgba(26, 26, 26, 0.815)',
            '--color-blue':'#c0c0c0',
            '--color-green':'#969696',
            '--color-red':'#ffffff',
            '--color-blue-dark':'#464646',
            '--color-green-dark':'#2e2e2e',
            '--color-red-dark':'#161616',
        },

        current:'CRAYON'
    }

}

export default function (state = initialState, action){
    if(!action.type) return state
    return {colorSchemes:{
        ...state.colorSchemes,
        current:[action.type]
    } }
}


