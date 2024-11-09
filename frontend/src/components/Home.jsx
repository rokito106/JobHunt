import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
// import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
// import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CategoryCarousel from './CategoryCarousel'

const HOme = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [])
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default HOme