import { useState } from 'react'
import './LoadingEffect.css'

const Loading_effect = ({ text }) => {
    console.log(text)
    return (
        <div className='loading_effect'>
            <div className='loading_effect_inner'>{text}</div>
        </div>
    )
}

export default Loading_effect