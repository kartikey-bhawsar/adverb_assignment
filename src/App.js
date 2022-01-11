import React, { useEffect, useState } from 'react';
import './App.css';

const getCountryData = () => {
  const promise = new Promise((resolve) => {
    fetch('https://restcountries.com/v3.1/region/asia')
      .then((response) => {
        return response.json();
      })
      .then((countryData) => {
        console.log(countryData);
        resolve(countryData);
      })
  });
  return promise;
}

function App() {

  const [currentCountryData, setCurrentCountryData]=useState([]);

  useEffect(() => {
    const promise = getCountryData();
    promise.then((countryData) => {
      //console.log(countryData);
      console.log(countryData.borders);
      setCurrentCountryData(countryData);
    })
  }, [])

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Asia's Country Data</h1><hr/>
      <Country currentCountryData={currentCountryData} />
    </div>
  );
}

const Country=({currentCountryData})=>{
    return(
      <div className="container">
        {
          (currentCountryData.length===0)?
          <h2>NO DATA FOUND</h2>:
          currentCountryData.map((regionwise)=>{
              return <CountryCard key={currentCountryData.area} currentCountryData={regionwise} />
          })
        }
      </div>
    )
}

const CountryCard = ({ currentCountryData }) => {
  return (
      <div className="card">
        <div className="box">
          <div className="content">
            <img src={currentCountryData.flags.png} alt="Avatar" style={{width:"100%",height:"20%"}}></img>
            <h1>{currentCountryData.name.common}</h1><hr/><br/>
            <p>Capital: <b style={{background:"#A1A09F", padding:"1px 5px" }}>{currentCountryData.capital}</b></p>
            <p>Region: <b style={{background:"#A1A09F", padding:"1px 5px"}}>{currentCountryData.region}</b></p>
            <p>Sub region: <b style={{background:"#A1A09F", padding:"1px 5px" }}>{currentCountryData.subregion}</b></p>
            <p>Population: <b style={{background:"#A1A09F", padding:"1px 5px" }}>{currentCountryData.population}</b></p>
            <p>Borders: <b style={{background:"#A1A09F", padding:"1px 5px" }}>{
              currentCountryData.borders!==undefined?
              currentCountryData.borders.map((border)=><span>{border},</span>)
              :<span>NA</span>
              }</b></p>
            <p>Languages: <b style={{background:"#A1A09F", padding:"1px 5px" }}>
              {Object.keys(currentCountryData.languages).map((item,i)=>{
                return(
                  <span>
                  <span>{currentCountryData.languages[item]}</span> ,
                  </span>
              )
              })}
            </b></p>
          </div>
        </div>
      </div>
  )
}

export default App;
