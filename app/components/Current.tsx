import { getCurrentDate } from "../utils/currentDate";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface CurrentProps {
  data: {
    current?: {
      condition: {
        icon: string;
        text: string;
      };
      temp_f: number;
    };
    location?: {
      name: string;
      region: string;
    };
  };
}

const Current = ({ data }: CurrentProps) => {
  const weatherIcon = data.current ? data.current.condition.icon : null;
  // const currentDate = getCurrentDate();
  return (
    <>
    <div className="flex-none">

<div className=" mb-2 text-2xl">
        {data.location ? (
          <div className=" text-center text-black card-bg subtext px-2 py-2 rounded-xl m-5">
       
            <span>
              {data.location.name}, {data.location.region}
            </span>
          </div>
        ) : null}
      </div>
    <div className="flex flex-col mb-8 md:mb-0 items-start   card-bg p-6 rounded-xl">
      
      <h1 className="text-5xl mx-auto text-gray-400 titletext ">Today</h1>
      
      <div className=" flex items-center mx-auto">
      
        <div className="">
        <div>
        {data.current ? (
          <p className="p-5 text-5xl subtext">
            {data.current.temp_f.toFixed()}
            <span>°</span>
          </p>
        ) : null}
       
      </div>
         
        </div>

        <div className=" p-5 float-right text-center">
        {weatherIcon && (
          <div className="">
            <img className="w-[70px] object-cover mx-auto " src={weatherIcon} alt="Weather Icon"  />
          </div>
        )}
        {data.current ? <span className="subtext text-2xl">{data.current.condition.text}</span> : null}
      </div>

      </div>
      
    </div>
    </div>
    </>
  );
};

export default Current;
