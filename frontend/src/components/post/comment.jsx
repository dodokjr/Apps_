import React from 'react'

export default function Comment({r}) {
  return (
    <div className='p-2 row-span-2'>
                            {r.user.image_profile ? <div className="avatar ring-primary ring-offset-base-100 w-9 rounded-full ring ring-offset-2">
                <img src={r?.user.image_profile ? r?.user.image_profile : 'http://localhost:3100/photoProfile/pp.jpg'} alt="" className='rounded-full' width={130} height={90}/>
                </div> : <div className="skeleton rounded-full"></div>}
                {/* Offsite */}
                <div className='text-2xl row-span-2 col-span-2'>
              {r?.user.name ? <div>{r?.user.name}</div> : <div className='skeleton'></div>}
              {r?.createdAt ? <div className='text-sm'>{r?.createdAt}</div> : <div className='skeleton'></div>}
            </div>
            <div>{r.Content}</div>
                            </div>
  )
}
