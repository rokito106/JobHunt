import { resetApplications } from '@/redux/applicationSlice';
import { resetCompany } from '@/redux/companySlice';
import { resetJobs } from '@/redux/jobSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const clearReduxState = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Call this after deleting data from MongoDB
    dispatch(resetJobs());
    dispatch(resetCompany());
    dispatch(resetApplications());
  }, []);
};
export default clearReduxState
// used in companies.jsx