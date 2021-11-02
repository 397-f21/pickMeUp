import { Modal } from "react-bootstrap";
import { useState } from "react";
import { getRefByPush, updateData, updateDataByPath } from "../firebase";

const getTimeIntervals = ( date ) => {

    /**check if date is defined */
    const interval_30_mins = 1800; 
    //date: 11/01/2021 -> 00:00 AM -> get epoch for this
    //date in epoch + 9hrs in epoch //9AM on this date
    
    const dateObj = new Date(0);
    const splitDate = date.split('-')
    
    dateObj.setDate(splitDate[2]);
    //because of zero indexing 
    dateObj.setMonth(Number.parseInt(splitDate[1]) - 1);
    dateObj.setFullYear(splitDate[0]);

    
    const startTime = dateObj.valueOf()/1000 - 32400

    return [ ...Array(24).keys()].map(i => startTime + i * interval_30_mins)
}


 /** Do the firebase push to create the event */
 const pushEvent =  ( event ) => {
  try {
    const eventRef = getRefByPush(`/events/`);
    const eventKey = eventRef.key;
    event = ({...event, 'event_id':eventKey});
   
    updateData(eventRef, event);
    return eventKey;

  } catch (error) {
    alert(error);
  }
}


const EventCreateModal = ({data, event, user, handleClose, sport }) => {
    
    const [localSport, setLocalSport] =  useState(sport);
    const [localCourt, setLocalCourt] =  useState("");
    const [localDate, setLocalDate] =  useState("");
    const [localTime, setLocalTime] =  useState("");

    const createAndJoinEvent = () => {
      const event_id = createEvent()
      if(event_id){
        joinEvent(0, event_id, user, data.users[user] && data.users[user].events)
        handleClose()
      } 

    }


    const createEvent =  () => {
        /** Validate all the input fields */
        if(!localSport){
          alert("Please select a Sport");
          return;
        }

        if(!localCourt){
          alert("Please select a Court");
          return;
        }

        if(!localDate){
          alert("Please select a Date");
          return;
        }

        if(!localTime){
          alert("Please select a Time Slot");
          return;
        }

        /* create an event object and push it into firebase*/

        /** create an event object */
        event = { 
            "date":localTime,
            "sport_id":localSport,
            "court_id":localCourt,
            "capacity":"",
            "player_count": 0
        }

        /** fire the push */
        const event_id = pushEvent(event);
        return event_id;
      }

    const joinEvent = (player_count, event_id, user, userEvents) => {
      if (!userEvents){
        userEvents = []
      }
      updateDataByPath(`/users/${user}/`, {user_id: user, events: [...userEvents, event_id]})
      updateDataByPath(`/events/${event_id}/`, {player_count:player_count+1})
        
    }

     // if (date) console.log("Date as toString "+(new Date(date*1000).toISOString().substr(0,10)));
  return (
    <Modal show={true} onHide={handleClose} animation={false}>
      <Modal.Header>
        <Modal.Title>Create Event</Modal.Title>
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
          {/* year-month-day : 2021-11-01 */}
          <input className="form-control" id="filterDate" type="date" onChange={ev => setLocalDate(ev.target.value)}/>
        {/**(new Date(date*1000).toISOString().substr(0,10))*/}
        </div>

        <div className="form-group p-2">
          <label>Time</label>
          <select className="form-select" onChange={ ev => setLocalTime(ev.target.value)} value={localTime}>
          <option value="" ></option>
            {  getTimeIntervals(localDate).map( time =>
                <option value={time} key={time}>
                { new Date(time*1000).toTimeString().substr(0,5) }
                </option> 
                )  
            }
          </select>
        </div>
       

      </Modal.Body>
      
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={handleClose}>
          Close
        </button>
        <button className='btn btn-primary' onClick={ () => createAndJoinEvent()  }>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  )
}
  
  export default EventCreateModal;
  