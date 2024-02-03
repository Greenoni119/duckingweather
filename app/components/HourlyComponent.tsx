"use client";
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HourlyComponentProps {
  hourlyForecast: {
    time: string;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
  }[];
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 4,
  initialSlide: 0,
  arrows: false,
  
  
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

const convertTo12HourFormat = (time24: string) => {
  const [hours, minutes] = time24.split(':');
  const parsedHours = parseInt(hours, 10);
  const period = parsedHours >= 12 ? 'PM' : 'AM';
  const formattedHours = parsedHours % 12 || 12;

  return `${formattedHours}:${minutes} ${period}`;
};

const HourlyComponent: React.FC<HourlyComponentProps> = ({ hourlyForecast }) => {
  const timePattern = /(\d{2}:\d{2})/;

  return (
    <div className="max-screen-w-xl pb-20">  
    <div className='text-6xl m-5 titletext'>24 hour Forecast</div>
      <div className=''>
        <Slider {...settings}>   
          {hourlyForecast.map((hourData, index) => {
            const timeMatch = hourData.time.match(timePattern);
            const time = timeMatch ? convertTo12HourFormat(timeMatch[1]) : 'Time not found';
            return (
    <div key={index} style={{ marginRight: '8px', marginBottom: '8px' }}>
    <div className="card-bg rounded-xl">
      <h3 className="titletext text-center mx-auto text-3xl">{time}</h3>
      <img src={hourData.condition.icon} alt={hourData.condition.text} className='mx-auto' width={100} />
      <p className="subtext text-center mx-auto text-3xl">{hourData.temp_f}°f</p>
    </div>
  </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default HourlyComponent;
