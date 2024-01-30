import React from 'react'

const ImageSlide = () => {
  return (
    <div className='h-screen w-full flex md:flex-row '>
       <div className=' xl:m-16 w-full bg-contain bg-center bg-no-repeat '>
         <img src="https://images.pexels.com/photos/5279020/pexels-photo-5279020.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
       </div>
       <div className=' xl:m-16 w-full bg-contain bg-center bg-no-repeat '>
         <img src="https://images.pexels.com/photos/457878/pexels-photo-457878.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
       </div>
    </div>
  )
}

export default ImageSlide
