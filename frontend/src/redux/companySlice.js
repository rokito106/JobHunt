import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:"",
    },
    reducers:{
        // actions
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        },
        resetCompany:(state)=>{
            state.companies=[],
            state.singleCompany=null,
            state.searchCompanyByText=""
        }
    }
});
export const {setSingleCompany, setCompanies,setSearchCompanyByText,resetCompany} = companySlice.actions;
export default companySlice.reducer;