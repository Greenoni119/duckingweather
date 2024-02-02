import React from 'react';

interface HourlyForecast {
  time: string;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
}

interface HourlyComponentProps {
  hourlyForecast: HourlyForecast[];
}

const HourlyComponent: React.FC<HourlyComponentProps> = ({ hourlyForecast }) => {
  return (
    <div className="media-scroller snaps-inline hourly-component flex m-5 ">
      {hourlyForecast.map((hourData, index) => (
        <div key={index} className="media-element hourly-item text-center m-5">
          <h3 className="text-slate-400">{hourData.time}</h3>
          <img src={hourData.condition.icon} alt={hourData.condition.text} />
          <p className="title text-slate-100">{hourData.temp_f}°f</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyComponent;
