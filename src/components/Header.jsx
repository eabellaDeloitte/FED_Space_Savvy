import ScrollUpIcon from '../images/down-chevron.svg';

function Header() {

    const scrollToTop = () => {
        window.scrollTo({ top: 620, behavior: 'smooth'});
    }
  return (
    
    <div className="">
        <div className="bg-[url(./images/space-photo.jpeg)] h-screen bg-no-repeat bg-cover">
            <div className="pt-5 pl-10 text-white uppercase">
                <header>Space Savvy</header>
            </div>
            
            <div className="flex justify-center items-center text-white mt-60 lg:text-6xl md:text-5xl sm:text-4xl">
                <h1>Discover Space Missions</h1>
            </div>
            
            <div className="flex justify-center items-center pt-52">

                <img className="h-8 w-8"
                    src={ScrollUpIcon}
                    alt='Scroll Up Icon'
                    onClick={scrollToTop}
                />

            </div>
            
        </div>
    </div>
  )
}

export default Header