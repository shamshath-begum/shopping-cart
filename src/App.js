
import axios from 'axios';
import { useEffect,useState } from 'react';
import './App.css';

function App() {
let[countries,setCountries]  = useState([]);
let[singleCountry,setsingleCountry]=useState('');
let[cities,setCities]=useState(null);
let[singlecity,setsingleCity]=useState("");
let[handlesubmit,sethandleSubmit]=useState(false)

let fetchCountries=async()=>{
  try{
let country=await axios.get("https://countriesnow.space/api/v0.1/countries");

setCountries(country.data.data)
  }catch(error){
    console.log(error);

  }

};

let fetchCities=(country)=>{
sethandleSubmit(false);
setsingleCity(null);

setsingleCountry(country);
let findCities=countries.find((c)=>c.country===country)
setCities(findCities.cities);
}
let handleSubmit=()=>{
if(singleCountry&&singlecity){
  sethandleSubmit(true)
}
}

  useEffect(()=>{
fetchCountries();
  },[])
  return <>
  <div className='App'>
  <div className='App-header'> 
  <h1>Select your Hometown</h1>
  <div>
    {
      countries && (
       <select onChange={(e)=>fetchCities(e.target.value)} value={singleCountry}>
         <option disabled selected hidden>Select Country</option>
       {
       countries.map((e,i)=>{
             return <option key={i} value={e.country}>{e.country}</option>
       })
       
       }
      </select>
 ) }

 {
  cities &&(
  <select onChange={(e)=>setsingleCity(e.target.value)} value={singlecity}>
    <option disabled selected hidden>Select City</option>
    
    {cities.map((city)=>{
   return <option key={city} value={city}>{city}</option>
    })
  }
  </select>
  )}
  <button onClick={handleSubmit}>Go</button>
  </div>
  {
    handlesubmit&&(<h3>Your country is {singleCountry} and your city is {singlecity}</h3>)}
  </div>
  </div>

  </>
}

export default App;
