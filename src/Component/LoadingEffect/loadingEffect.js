import { useState } from 'react'
import './LoadingEffect.css'

const Loading_effect = () => {
    // console.log(text)
    return (
        <div className='loading_effect'>
        {/* <div class="loading_img">  */}
            <div className="loading">
                <div className="loading-circle loading-circle-ani-1"></div>
                <div className="loading-circle loading-circle-ani-2"></div>
                <div className="loading-circle loading-circle-ani-3"></div>
                <div className="loading-circle loading-circle-ani-4"></div>
                <div className="loading-circle loading-circle-ani-5"></div>
            </div>
        {/* </div>  */}
        </div>
        // <div className='loading_effect'>
        //     <div className='loading_effect_inner'>{text}</div>
        // </div>
    )
}

export default Loading_effect