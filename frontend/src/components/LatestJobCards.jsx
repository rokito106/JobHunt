import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`jobdescription/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
      <div>
        <h1 className='font-md text-lg'>{job?.company?.name}</h1>
        <p className='text-md text-gray-600'>India</p>
      </div>
      <div>
        <h1 className='font-md text-lg my-1'>{job?.title}</h1>
        <p className='text-md text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant={"ghost"}>{job?.position} Positions</Badge>
        <Badge className={'text-[#F83200]  font-bold'} variant={"ghost"}>{job?.jobType}</Badge>
        <Badge className={'text-[#7209B7] font-bold'} variant={"ghost"}>{job?.salary}LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards