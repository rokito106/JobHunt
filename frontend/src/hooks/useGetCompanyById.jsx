
import { COMPANY_API_END_POINT } from '@/components/utils/constant'
import { setSingleCompany } from '@/redux/companySlice'
import { setAllJobs } from '@/redux/jobSlice'
// import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const [loading, setLoading] = useState(true); // Add loading state

    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                // console.log(res.data.company);
                console.log('API Response:', res.data); // Check the structure here
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetCompanyById
