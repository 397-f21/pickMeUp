import { Modal } from "react-bootstrap";
import { useState } from "react";

const EventFilterModal = ({ data, sport, setSport, court, setCourt, date, setDate, handleClose }) => {
  const [localSport, setLocalSport] = useState(sport);
  const [localCourt, setLocalCourt] = useState(court);

  const applyFilter = () => {
    setSport(localSport);
    setCourt(localCourt);

    const dateInput = document.querySelector("#filterDate").value;
    // format: yyy-mm-dd
    // console.log("from query"+dateInput);
    if (dateInput) {
      const dateObj = new Date(0);
      const splitDate = dateInput.split('-')
      
      dateObj.setDate(splitDate[2]);
      //because of zero indexing 
      dateObj.setMonth(Number.parseInt(splitDate[1]) - 1);
      dateObj.setFullYear(splitDate[0]);

      // console.log("dateObj in apply: "+dateObj);
      // console.log("Date in applyFilter: "+ dateObj.valueOf()/1000);
      setDate(dateObj.valueOf()/1000);
    }
    else {
      setDate("");
    }

    handleClose();
  };

  // if (date) console.log("Date as toString "+(new Date(date*1000).toISOString().substr(0,10)));
  return (
    <Modal show={true} onHide={handleClose} animation={false}>
      <Modal.Header>
        <Modal.Title>Filter Events</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <div className="form-group p-2">
          <label>Sport</label>
          <select 
              className="form-select" 
              onChange={ ev => {setLocalCourt(""); setLocalSport(ev.target.value)} } 
              value={ localSport } 
              data-testid="filter_input_sport">
            {Object.values(data.sports).map(sport_item => (
              <option key={sport_item.sport_id} value={sport_item.sport_id} >
                {sport_item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group p-2">
          <label>Court</label>
          <select 
              className="form-select" 
              onChange={ ev => setLocalCourt(ev.target.value)} 
              value={localCourt} 
              data-testid="filter_input_court">
            <option value="" >All</option>
            {Object.values(data.sports[localSport].courts).map(court_item => (
              <option key={court_item.court_id} value={court_item.court_id} >
                {court_item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group p-2">
          <label>Date</label>
          {/* year-month-day */}
          <input 
              className="form-control" 
              id="filterDate" 
              type="date" 
              defaultValue={date && (new Date(date*1000).toISOString().substr(0,10))} 
              data-testid="filter_input_date"/>
        </div>
       

      </Modal.Body>
      
      <Modal.Footer>
        <button 
            className='btn btn-secondary' 
            onClick={handleClose}>
          Close
        </button>
        <button 
            className='btn btn-primary' 
            onClick={() => applyFilter()}
            data-testid="filter_button_submit">
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  )
};

export default EventFilterModal;