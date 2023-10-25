import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Results from './components/Results';
import YearRangeAlert from './components/YearRangeAlert';


const App = () => {
  const [lauchesData, setLauchesData] = useState([]);
  const [lauchPadData, setLauchPadData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [launchPadOptions, setLaunchPadOptions] = useState('Any');
  const [minYearOption, setMinYearOption] = useState('Any');
  const [maxYearOption, setMaxYearOption] = useState('Any');
  const [filteredLaunchDatas, setFilteredLaunchDatas] = useState([]);
  const [showYearRangeAlert, setShowYearRangeAlert] = useState(false);
  const unqiueYears = new Set();

  // Method to get all launches data using fetch
  const searchLauches = async () => {
    try {
      const response = await fetch('http://localhost:8001/launches');
      const data = await response.json();
      setLauchesData(data);
      setFilteredLaunchDatas(data);
      
    } catch (error) {
      console.error('this is the error', error);
    }
  }

  // Method to get all Launchpad data using fetch
  const searchLaunchpad = async () => {
    try {
      const response = await fetch('http://localhost:8001/launchpads');
      const data = await response.json();
      setLauchPadData(data);
    } catch (error) {
      console.error('this is the error', error);
    }
  }

  // Loop through the launches data to parse launch date into date object
  lauchesData.forEach(item => {
    const dateObject = new Date(item.launch_date_local);
    const years = dateObject.getFullYear();
    unqiueYears.add(years);
  })

  const uniqueYearArray = Array.from(unqiueYears);
  
  useEffect(()=> {
    searchLauches();
    searchLaunchpad();
  }, []);

  //Method to get the full name of launch pad if the id is equal to lauches site id
  const getLaunchPadNameBySiteId = (id) => {
    const launchPad = lauchPadData.find((item) => item.id === id);
    return launchPad ? launchPad.full_name : 'Any';
  }

  //Method to apply all filters 
  const applyFilters = () => {
    const filteredDatas = lauchesData.filter((item) => {
      if(minYearOption !== 'Any' && maxYearOption !== 'Any' && minYearOption > maxYearOption){
        setShowYearRangeAlert(true);
      } else {
        setShowYearRangeAlert(false);
        const releaseYear = new Date(item.launch_date_local).getFullYear();
        const nameMatch = item.rocket.rocket_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.flight_number.toString().includes(searchTerm.toLowerCase());

        const payloadIdMatch = item.payloads.some(payload => payload.payload_id.toLowerCase().includes(searchTerm.toLowerCase()));
        const launchpadOptions = launchPadOptions === 'Any' || item.launch_site.site_id === launchPadOptions;
        const minYearMatch = minYearOption === 'Any' || releaseYear >= minYearOption;
        const maxYearMatch = maxYearOption === 'Any' || releaseYear <= maxYearOption;
        
        return (nameMatch || payloadIdMatch) && launchpadOptions && minYearMatch && maxYearMatch;
      }
    });
    setFilteredLaunchDatas(filteredDatas);
  }

  //Method to set show year alert to false
  const closeYearRangeAlert = () => {
    setShowYearRangeAlert(false);
  }

  //Method to scroll to the result area
  const scrollToTop = () => {
    window.scrollTo({ top: 620, behavior: 'smooth'});
  }

  return (
    <div className="App">
      <Header />
      
      <div className="bg-gray-200 lg:text-base md:text-sm sm:text-xs">
        <div className="pt-12 bg-gray-200">

        </div>
        <div className="flex justify-evenly items-center ml-12 mr-12 p-12 bg-slate-50 border-b-2">
            <div>
              <div className="p-1">
                Keywords
              </div>
              <div className="">
                <input 
                  className="border-solid border-2 border-gray-300 rounded-sm p-1.5 xl:w-72 lg:w-52 md:w-36 sm:w-24"
                  type='text'
                  placeholder='eg Falcon'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="p-1">
                Launch Pad
              </div>
              <div className="">
                <select 
                  className="border-solid border-2 border-gray-300 rounded-sm p-2 xl:w-72 lg:w-52 md:w-36 sm:w-24"
                  value={launchPadOptions}
                  onChange={e => setLaunchPadOptions(e.target.value)}
                >
                  <option value='Any'>Any</option>
                  {lauchPadData.map(item => (
                    <option key={item.id} value={item.id}>{item.full_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="p-1">
                Min Year
              </div>
              <div className="">
                <select className="border-solid border-2 border-gray-300 rounded-sm p-2 lg:w-32 md:w-16"
                  value={minYearOption}
                  onChange={e => setMinYearOption(e.target.value)}>
                  <option value='Any'>Any</option>
                  {uniqueYearArray.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="p-1">
                Max Year
              </div>
              <div className="">
                <select className="border-solid border-2 border-gray-300 rounded-sm p-2 lg:w-32 md:w-16"
                  value={maxYearOption}
                  onChange={e => setMaxYearOption(e.target.value)}>
                  <option value='Any'>Any</option>
                  {uniqueYearArray.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-8">
              <button 
                className="border-solid border-2 bg-teal-600 rounded-md p-2 lg:w-32 md:w-20 text-white hover:bg-teal-500"  
                onClick={applyFilters}>Apply
              </button>
            </div>
        </div>
        
        <div className="bg-white mb-12 ml-12 mr-12 p-4">
          <div className="flex justify-center items-center text-gray-400 mt-5">
            <strong>Showing {filteredLaunchDatas.length} Missions</strong> 
          </div>
          {filteredLaunchDatas.map((data, i) => (
            <Results
              key={i}
              data={data}
              launchSiteName = {getLaunchPadNameBySiteId(data.launch_site.site_id)}
            />
          ))}
        </div>
        <div className="flex justify-center items-center">
          {showYearRangeAlert && <YearRangeAlert onClose={closeYearRangeAlert} />}
        </div>

        <footer className="flex justify-between pl-6 pr-6 pb-6">
          <p className="text-gray-400">Copyright &#169; 2018 Space Savvy</p>
          <button className="text-gray-600" onClick={scrollToTop}><u>Back to the top</u></button>
        </footer>
      </div>
      
    </div>
  );
}

export default App;
