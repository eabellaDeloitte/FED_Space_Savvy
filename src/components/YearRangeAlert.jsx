function YearRangeAlert({ onClose }) {
  return (
    <div className="flex justify-center items-center">
        <div className="flex justify-center items-center">
            <h2>Invalid Year Range &nbsp;</h2>
        </div>
        <div className="flex justify-center items-center">
            <p>Invalid year range selected. Please choose a valid range. &nbsp;</p>
            <br />
            <br />
        </div>
        <div className="">
            <button onClick={onClose}>X</button>
        </div>
        
    </div>
  )
}

export default YearRangeAlert;