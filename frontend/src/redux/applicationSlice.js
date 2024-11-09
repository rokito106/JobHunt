import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        resetApplications:(state)=>{
            state.applicants=null
        }
    }
});
export const {setAllApplicants,resetApplications} = applicationSlice.actions;
export default applicationSlice.reducer;