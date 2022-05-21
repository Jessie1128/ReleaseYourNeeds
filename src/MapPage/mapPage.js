// import Source from '../source/source'
import './mapPage.css'
import Header from './Header/header'
import MapArea from './MapArea/mapArea'
// import Source from '../source/source.js'

const MapPage = () =>{

    // const bodyBackground = {
    //     // {backgroundImage: `url(${"../source/mapImg.png")}`}, 
    //     backgroundImage: `url(${require("../source/mapImg.png")})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     backgroundSize: 'cover'
    // }
    
    // Source()
    const bodyBackground ={
        backgroundImage: `url(${require('../source/mapImg-2.png')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:'100vh'
      }

    return (
        <div style={bodyBackground}>
            <Header />
            <MapArea />
        </div>
    )
}

export default MapPage