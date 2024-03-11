"use client";
import React, { useState, useEffect } from "react";
import Current from "./components/Current";
import Input from "./components/Input";
import WeekForecast from "./components/WeekForecast";
import WeatherDetails from "./components/WeatherDetails";
import HourlyComponent from "./components/HourlyComponent";

export default function Home() { 
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const url = `https://api.weatherapi.com/v1/forecast.json?key=3bf09101fc104573a5a203236241103&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("City not found");
        setData({});
      }
    }
  };
  
  useEffect(() => {
    console.log("API Response:", data);
  }, [data]);
  
  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div className="text-white text-center h-screen ">
        <h2 className="text-3xl font-semibold mb-4 mx-auto">Made by hunters <br /> for hunters</h2>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-semibold mb-4">City not found</h2>
        <p className="text-xl">Please enter a valid city name</p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex md:flex-row flex-col p-12 items-center justify-center gap-10 lg:gap-20  ">
          <Current data={data} />
          <WeatherDetails data={data} />
        </div>

       <div className="">
          {data.forecast?.forecastday[0]?.hour && (
            <HourlyComponent hourlyForecast={data.forecast.forecastday[0].hour}/>
          )}
        </div>

        <div>
          <WeekForecast data={data} />
        </div>
        <footer className="card-bg text-center subtext text-3xl">created by Charles Greene </footer>
      </>
    );
  }

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto ">
      <div className=" w-full rounded-lg flex flex-col ">
        <div className="flex flex-col md:flex-row justify-between items-center px-5">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 pt-2 order-1 text-white text-2xl px-4 rounded-xl italic font-bold">
            DuckingWeather
          </h1>
        </div>
        {content}
      </div>
    </div>
  );
}
