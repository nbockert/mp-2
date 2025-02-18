import { useState, useEffect } from 'react'
import styled from 'styled-components';
import PropertyList from './components/Zillow.tsx';
import {Property, ApiResponse} from './interfaces/Property.ts';


const ParentDiv = styled.div`
width: 80vw;
margin: 0 auto;
border: 5px solid hotpink;
justify-content: center;
align-items: center;`;

const API_URL = "https://zillow-com1.p.rapidapi.com/propertyExtendedSearch?location=94105&page=3&status_type=ForRent&home_type=Apartments_Condos_Co-ops&sort=Payment_Low_High&rentMaxPrice=4000&bedsMax=1";
console.log("API Key:", import.meta.env.VITE_RAPIDAPI_KEY);

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    }
};


export default function App(){
    console.log("hello")
    const [data,setData] = useState<Property[]>([]);
    useEffect(()=>{
        async function fetchData(): Promise<void>{
            const rawData= await fetch(API_URL, options);
            // const {results} : {results: Property[]} = await rawData.json();
            // const response = await rawData.json();
            const response: ApiResponse = await rawData.json();
            console.log("Raw API Response:", response); // Log the raw response

            if (response.props) {
                setData(response.props);  // Only set if results are available
            } else {
                console.log("No results in API response");
            }
            // setData(results);
        }
        fetchData()
            .then(()=>console.log("Data fetched successfully"))
            .catch((e:Error)=>console.log("There was a problem fetching data: "+ e));
    }, [data.length]);
    return (
        <ParentDiv>
            <PropertyList data={data}/>
        </ParentDiv>
    )
}