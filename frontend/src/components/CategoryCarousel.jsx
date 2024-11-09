// import React from 'react'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
// import { Button } from './ui/button'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

// const category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Graphic Design",
//     "Data Science",
//     "FullStack Developer",
//     "PHP Developer",
//     "MERN Stack Developer"
// ]
// const CategoryCarousel = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const searchJobHandler = (query) => {
//         dispatch(setSearchedQuery(query));
//         navigate("/browse");
//         return (
//             <div>
//                 <Carousel className="w-full max-w-xl mx-auto my-20" >
//                     <CarouselContent>
//                         {
//                             category.map((cat, index) => (

//                                 <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
//                                     <Button onClick={() => searchJobHandler(cat)} className="rounded-full hover:bg-black hover:text-white" variant=""  >{cat}</Button>
//                                 </CarouselItem>
//                             ))
//                         }

//                     </CarouselContent>
//                     <CarouselPrevious />
//                     <CarouselNext />
//                 </Carousel>
//             </div>
//         )
//     }

//     export default CategoryCarousel


import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontened Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>searchJobHandler(cat)} className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel