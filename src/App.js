import { updateDataByPath, useData, } from "./firebase";
import {useState} from 'react'
import EventFilterModal from "./components/EventFilterModal";
import { FcSportsMode } from "react-icons/fc";


const join = (player_count, event_id,user,userEvents) => {
  if (!userEvents){
    userEvents = []
  }
  updateDataByPath(`/users/${user}/`, {events: [...userEvents, event_id]})
  updateDataByPath(`/events/${event_id}/`, {player_count:player_count+1})
    
}

const leave = (player_count, event_id,user,userEvents) => {
  if (!userEvents){
    userEvents = []
  }
  updateDataByPath(`/users/${user}/`, {events: userEvents.filter(event => event !== event_id)})
  updateDataByPath(`/events/${event_id}/`, {player_count: (player_count > 0) ? player_count-1 : 0})
  
}


const filterEvents = (events, sport, court, date) => {
  let filteredEvents = events
  if (sport) {
    filteredEvents = filteredEvents.filter((event) => event.sport_id === sport)
  }
  if (court) {
    filteredEvents = filteredEvents.filter((event) => event.court_id === court)
  }
  if (date) {
    const filterDate = (new Date(date*1000)).toLocaleDateString()
    filteredEvents = filteredEvents.filter((event) => (new Date(event.date*1000)).toLocaleDateString() === filterDate)
  }
  return filteredEvents.sort((e1, e2) => e1.date - e2.date)
}

function App() {
  const [data, loading, error] = useData("/")
  const [user, setUser] = useState("idU0")
  const [sport, setSport] = useState('idS1')
  const [court, setCourt] = useState('')
  const [date, setDate] = useState()

  const [showFilter, setShowFilter] = useState(false);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  if (error) return <h1>{error}</h1>
  if (loading) return <h1>loading...</h1>
  return (
    <div className="container">
     
      {sport && (
        <h4 className='text-center'>
          {data.sports[sport].name} Events
        </h4>
      )}
      

      <button className="btn btn-primary" onClick={handleShowFilter}>
        Filter Events
      </button>

      {showFilter && (
        <EventFilterModal show={showFilter}
            handleClose={handleCloseFilter}
            data={data}
            sport={sport}
            setSport={setSport}
            court={court}
            setCourt={setCourt}
            date={date}
            setDate={setDate} />
      )}



      {filterEvents(Object.values(data.events), sport, court, date).map(event => (
       <div className = 'col-lg-8 card m-2 p-1 mx-auto border-dark' key = {event.event_id}> 
          <div className = 'card-body d-flex align-items-center justify-content-between'>
          <div>
              <div className="fw-bold">
                { data.sports[event.sport_id].name }
              </div>
              <div>
                { data.sports[event.sport_id].courts[event.court_id].name }
              </div>
              <div className="card-text">
                { (new Date(event.date*1000)).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}) }
              </div>
          </div>
          <div className="d-flex flex-nowrap flex-column align-items-center">
            <div className="mb-1">
              { event.player_count }
              <FcSportsMode style={{height: '1.5em', width: '1.5em'}}/>
            </div>
            {( data.users[user].events && data.users[user].events.includes(event.event_id)) ? (
              <button className='btn btn-warning bg-opacity-25' style={{width:"6em"}} onClick={ (ev) => leave(event.player_count, event.event_id, user, data.users[user].events) } >Leave</button>
            ) :
            (
              <button className='btn btn-success bg-opacity-25' style={{width:"6em"}} onClick={ (ev) => join(event.player_count, event.event_id, user, data.users[user].events) } >Join</button>
            )
          
          }
    
          </div>
         </div>
       </div> 
      ))}
    </div>
  );
}

export default App;
