import React, { useEffect, useState , useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

    const key='9c599aa5a2d13d5c6af5837c42d3b898';

    const inputRef=useRef(null);

    const [weatherData,setWeatherData]=useState(false);

    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon
    }

    const search= async(city)=>{
        if(city===""){
            alert("Enter City Name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
            
            const response=await fetch (url);
            const data=await response.json();
            console.log(data);

            const firstEntry = data.list[0];

            const icon=allIcons[firstEntry.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity:firstEntry.main.humidity,
                windSpeed:firstEntry.wind.speed,
                temperature:Math.floor(firstEntry.main.temp),
                location:data.city.name,
                icon:icon
            })

        } catch(err){
            setWeatherData(false);
            <h1>There is an issue in the site. If not accessible, mail to: chauhanshashank134@gmail.com</h1>
        }
    }

    useEffect(()=>{
        search("delhi");
    },[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input type="text" ref={inputRef} placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>

{/* if ther is some invaluid info the nhise the ui */}

        {weatherData?<>
        
            <img src={weatherData.icon} alt="weather-icon" />
        <p className='temperature'>{weatherData.temperature}&deg;c</p>
        <h2 className='location' style={{color:"snow"}}>{weatherData.location}</h2>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="humidity" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="wind" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        
        </> : <></>}
        
        
    </div>
  )
}

export default Weather
