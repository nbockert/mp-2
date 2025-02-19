import styled from "styled-components";
import {Property} from "../interfaces/Property.ts";


const PropDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: lightpink;
    
`;
const Header=styled.h1`
   text-align: center;
    font: italic small-caps bold calc(3px+ 2vw) Georgia, serif;
    color: hotpink;
    
`;

const SinglePropDiv =styled.div<{price: number}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: ${(props)=>(props.price <=3000 ? 'purple':'navy')};
    color: ${(props)=>(props.price > 3000 ? 'red' : 'white')};
    border: 3px solid mediumpurple;
    text-align: center;
    font: italic small-caps bold calc(2px+ 1vw) Georgia, serif;
`;

export default function PropertyList(props :{data:Property[]}){
    return(
        <>
            <Header>Apartments Near San Francisco Bay Area</Header>
        <PropDiv>
            {
                props.data.map((prop:Property) =>
                    <SinglePropDiv key={prop.zpid} price={prop.price}>
                        <img src={prop.imgSrc} alt={'image of ${prop.propertyType}'}/>

                        <h1>{prop.address}</h1>
                        <p>${prop.price}</p>
                        <p>Beds: {prop.bedrooms} Baths:{prop.bathrooms}</p>
                        <p>{prop.propertyType}</p>


                    </SinglePropDiv>)
            }
        </PropDiv>
        </>
    );

}