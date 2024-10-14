import React from 'react'
import Layout from '../../../components/utilities/layout'

export default function CreateGroups() {
  return (
    <Layout>
        <div className='flex justify-start items-start p-2'>
            <div className='p-3'>
                <div className='breadcrumbs text-sm'>
                    <ul>
                        <li><a>Group</a></li>
                        <li>Create</li>
                    </ul>
                </div>
                    <b className='text-bold text-2xl'>Create Groups</b>
                <div>
                <form className='space-y-6'>
                        <div>
                        <label className="block text-sm font-medium text-white">Name Groups</label>
                        <input className='input input-bordered w-full max-w-xs' placeholder='Type Your Name Groups'/>
                        </div>
                        <div>
                        <label className="block text-sm font-medium text-white">Description</label>
                        <textarea className="textarea textarea-bordered" placeholder="Type Your Description"></textarea>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-white'>Privete Or Public</label>
                            <select className='select select-bordered w-full max-w-xs'>
                                <option value="false">Public</option>
                                <option value="true">Private</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-white'>Group Photo Profile</label>
                            
                        </div>
                </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}
