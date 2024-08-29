import React from 'react'

export const ButtonFollow = ({name, comName}) => {
  if(name !== comName) {
    return <div className='btn'>Button Follow</div>
  } else {
    return <a href='/account/edit' className='btn'>Edit Profile</a>
  }
} 
