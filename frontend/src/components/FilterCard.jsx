// import React from 'react'
// import { RadioGroup, RadioGroupItem } from './ui/radio-group'
// import { Label } from './ui/label'

// const filterData = [
//     {
//         filterType: "Location",
//         array: ["Delhi NCR", "Pune", "Mumbai", "Hyderabad", "Banglore", "Noida"]
//     },
//     {
//         filterType: "Industry",
//         array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
//     },
//     {
//         filterType: "Salary",
//         array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
//     },
// ]
// const FilterCard = () => {
//     return (
//         <div className='w-full rounded-md p-3 bg-white'>
//             <h1 className='font-bold text-xl'>Filter Jobs</h1>
//             <hr className='mt-4' />
//             <RadioGroup>
//                 {
//                     filterData.map((data, index) => (
//                         <div>
//                             <h1 className='font-bold text-lg'>{data.filterType}</h1>
//                             {
//                                 data.array.map((item, index) => {
//                                     return (
//                                         <div className='flex items-center space-x-2 my-2'>
//                                             <RadioGroupItem value={item} />
//                                             <Label>{item}</Label>
//                                         </div>
//                                     )
//                                 })
//                             }
//                         </div>
//                     ))
//                 }
//             </RadioGroup>
//         </div>
//     )
// }

// export default FilterCard

import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Gurugram", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontened Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard