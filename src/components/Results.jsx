import { useState, useEffect } from 'react';
import { format } from 'date-fns';
function Results({ data, launchSiteName }) {

  const [imageError, setImageError] = useState(false);
  const [mission, setMissions] = useState(false);


  const handleImageError = () => {
    setImageError(true);
  }

  const handleMission = () => {
    if(data.launch_success === true && data.land_success === true){
      setMissions(true);
    }
  }

  const dateObject = new Date(data.launch_date_local);
  const launchDates = format(dateObject, 'do MMMM yyyy')
  const launchTimes = dateObject.toLocaleTimeString();

  useEffect(()=> {
    handleMission();
  },);

  return (
    <>
      <div className="flex m-5 p-4 border-b-2">
        {/* Image Div*/}
        <div className="lg:h-[110px] lg:w-[110px] md:h-[80px] md:w-[90px] sm:h-[50px] sm:w-[60px] flex justify-center items-center">
          {imageError ? (<p className="text-green-600 text-center lg:text-base md:text-sm sm:text-xs">Image Unavailable</p>) : (<img className="lg:h-[110px] lg:w-[110px] md:h-[70px] md:w-[80px] sm:h-[40px] sm:w-[40px]" src={data.links.mission_patch} alt="Mission Patch" onError={handleImageError} referrerPolicy="no-referrer" />)}
        </div>
        {/* Name & Discription Div*/}
        <div className="p-5">
          <p></p>
          <div className="flex md:text-[14px] sm:text-[12px]">
            {data.rocket.rocket_name}  -  {data.payloads.map((elem)=> { return (elem.payload_id)})}   {mission ? <p>&nbsp;</p> : <p className="text-red-600"> &nbsp; - Failed Mission</p>}
            
          </div>
          <div className="md:text-[12px] sm:text-[10px] mt-2 text-gray-400">
              Launched on <strong>{launchDates}</strong> at <strong>{launchTimes}</strong> from <strong>{launchSiteName}</strong>
          </div>

          <div className="pt-10 flex justify-start">
            {data.links.reddit_campaign ? (<div className="lg:mr-4 md:mr-2 sm:mr-1 border-solid border-2 border-gray-300 rounded-sm hover:bg-gray-200" ><a href={data.links.reddit_campaign} target="_blank" rel="noreferrer"><button className="lg:m-2 sm:m-1 md:text-[12px] sm:text-[8px] text-gray-500 ">Reddit Campaign</button></a></div>) : <div></div>}
            {data.links.reddit_launch ? (<div className="lg:mr-4 md:mr-2 sm:mr-1 border-solid border-2 border-gray-300 rounded-sm hover:bg-gray-200"><a href={data.links.reddit_launch} target="_blank" rel="noreferrer"><button className="lg:m-2 sm:m-1 md:text-[12px] sm:text-[8px] text-gray-500 ">Reddit Launch</button></a></div>) : <div></div>}
            {data.links.reddit_recovery ? (<div className="lg:mr-4 md:mr-2 sm:mr-1 border-solid border-2 border-gray-300 rounded-sm hover:bg-gray-200"><a href={data.links.reddit_recovery} target="_blank" rel="noreferrer"><button className="lg:m-2 sm:m-1 md:text-[12px] sm:text-[8px] text-gray-500 ">Reddit Recovery</button></a></div>) : <div></div>}
            {data.links.reddit_media ? (<div className="lg:mr-4 md:mr-2 sm:mr-1 border-solid border-2 border-gray-300 rounded-sm hover:bg-gray-200"><a href={data.links.reddit_media} target="_blank" rel="noreferrer"><button className="lg:m-2 sm:m-1 md:text-[12px] sm:text-[8px] text-gray-500 ">Reddit Media</button></a></div>) : <div></div>}
            {data.links.presskit ? (<div className="lg:mr-4 md:mr-2 sm:mr-1 border-solid border-2 border-gray-300 rounded-sm hover:bg-gray-200"><a href={data.links.presskit} target="_blank" rel="noreferrer"><button className="lg:m-2 sm:m-1 md:text-[12px] sm:text-[8px] text-gray-500 ">Press</button></a></div>) : <div></div>}
            {data.links.article_link ? (<div className="lg:mr-4 md:mr-2 sm:mr-1 border-solid border-2 border-gray-300 rounded-sm hover:bg-gray-200"><a href={data.links.article_link} target="_blank" rel="noreferrer"><button className="lg:m-2 sm:m-1 md:text-[12px] sm:text-[8px] text-gray-500 ">Article</button></a></div>) : <div></div>}
            {data.links.video_link ? (<div className="lg:mr-4 md:mr-2 sm:mr-1 border-solid border-2 border-gray-300 rounded-sm hover:bg-gray-200"><a href={data.links.video_link} target="_blank" rel="noreferrer"><button className="lg:m-2 sm:m-1 md:text-[12px] sm:text-[8px] text-gray-500 ">Watch Video</button></a></div>) : <div></div>}
          </div>
        </div>
        
        <div className="ml-auto p-5 mr-6 ">
          <div className="lg:text-2xl text-center md:text-[14px] sm:text-[12px]">
            #{data.flight_number} &nbsp;
            
          </div>
          <div className="lg:text-sm text-gray-500 md:text-[14px] sm:text-[12px]">
            Flight Number
          </div>
        </div>
        
      </div>
    </>
    
  )
}

export default Results;