import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='px-4 py-2 rounded-full text-[#F83200] font-medium bg-gray-100 mx-auto'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search , Apply & <br />Get Your <span className='text-[#683AC2]'>Dream Job</span></h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore praesentium qui iusto veniam. Dolore?</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto '>
                    <input 
                    type="text"
                    placeholder='Find your dream job'
                    onChange={(e) => setQuery(e.target.value)}
                    className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#683AC2]">
                        <Search className='h-5 w-5'/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection