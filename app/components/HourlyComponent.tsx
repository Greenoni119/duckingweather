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
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
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
    <div className="m-5 pb-20">  
      <div className=''>
        <Slider {...settings}>   
          {hourlyForecast.map((hourData, index) => {
            const timeMatch = hourData.time.match(timePattern);
            const time = timeMatch ? convertTo12HourFormat(timeMatch[1]) : 'Time not found';

            return (
              <div key={index} className="">
                <h3 className="text-slate-400 text-center mx-auto text-3xl">{time}</h3>
                <img src={hourData.condition.icon} alt={hourData.condition.text} className='mx-auto' width={100} />
                <p className="text-slate-10 text-center mx-auto text-3xl">{hourData.temp_f}°f</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default HourlyComponent;
