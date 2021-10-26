import { Modal } from "react-bootstrap";
import { useState } from "react";

const EventFilterModal = ({ data, sport, setSport, court, setCourt, date, setDate, handleClose }) => {
  const [localSport, setLocalSport] = useState(sport);
  const [localCourt, setLocalCourt] = useState(court);
  const [localDate, setLocalDate] = useState(
    date && new Date(date*1000).toLocaleDateString().split(',')[0].split('/').reverse().join('-') );




  const applyFilter = () => {
    setSport(localSport);
    setCourt(localCourt);
    const date = new Date(0);
    const splitDate = localDate.split('-')
    
    date.setDate(splitDate[2]);
    //because of zero indexing 
    date.setMonth(Number.parseInt(splitDate[1]) - 1);
    date.setFullYear(splitDate[0]);

    console.log("Date in applyFilter: "+ date.valueOf()/1000);
    setDate(date.valueOf()/1000);
    handleClose();
  };

  console.log("Date: "+localDate )
  return (
    <Modal show={true} onHide={handleClose} animation={false}>
      <Modal.Header>
        <Modal.Title>Filter Events</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <div className="form-group p-2">
          <label>Sport</label>
          <select className="form-select" 
              onChange={ ev => {setLocalCourt(""); setLocalSport(ev.target.value)} } 
              value={ localSport } >
            {Object.values(data.sports).map(sport_item => (
              <option value={sport_item.sport_id} key={sport_item.sport_id}>
                {sport_item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group p-2">
          <label>Court</label>
          <select className="form-select" onChange={ ev => setLocalCourt(ev.target.value)} value={localCourt}>
          <option value="" >All</option>
            {Object.values(data.sports[localSport].courts).map(court_item => (
              <option value={court_item.court_id} key={court_item.court_id}>
                {court_item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group p-2">
          <label>Date</label>
          <input className="form-control" id="dueDate" type="date" onChange={ ev => setLocalDate(ev.target.value)} value={ localDate } />
        </div>
       

      </Modal.Body>
      
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={handleClose}>
          Close
        </button>
        <button className='btn btn-primary' onClick={applyFilter}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  )
};

export default EventFilterModal;