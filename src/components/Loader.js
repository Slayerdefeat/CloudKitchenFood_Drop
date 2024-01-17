import React from 'react'
// import logo from "";
import img from '../assets/images/loader.gif'


const Loader = () => {

 
  return (
    <div className='box-shadow' style={{display:"flex",justifyContent:'center',alignItems:'center',height:'100vh',width:'100%',}}>
      <img src={img} className='loader_img'  />
    </div>
  )
}

export default Loader