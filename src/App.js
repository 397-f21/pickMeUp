import { updateDataByPath, useData, } from "./firebase";
import {useState} from 'react'


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
// const SportButton = ({sport, selected})



function App() {
  const [data, loading, error] = useData("/")
  const [user, setUser] = useState("idU0")
  const [sport, setSport] = useState('')
  const [court, setCourt] = useState('')
  const [date, setDate] = useState('')

  if (error) return <h1>{error}</h1>
  if (loading) return <h1>loading...</h1>
  return (
    <div>
      <h1>PickMeUp</h1>
      {filterEvents(Object.values(data.events), sport, court, date).map(event => (
       <div className = 'col-lg-8 card m-2 p-2 mx-auto border-dark'> 
          <div className = 'card-body d-flex align-items-center justify-content-between'>
          <div>
              <div className="card-title">
                { data.sports[event.sport_id].name }
              </div>
              <div>
                {data.sports[event.sport_id].courts[event.court_id].name}
              </div>
              <div className="card-text">
                {(new Date(event.date*1000)).toLocaleString()}<br/> 
              </div>
          </div>
          <div>
            <span style={{display:'inline-block'}}>{event.player_count}</span>
            {( data.users[user].events && data.users[user].events.includes(event.event_id)) ? (
              <button className='btn btn-warning bg-opacity-25 m-4' style={{width:"6em"}} onClick={ (ev) => leave(event.player_count, event.event_id, user, data.users[user].events) } >Leave</button>
            ) :
            (
              <button className='btn btn-success bg-opacity-25 m-4' style={{width:"6em"}} onClick={ (ev) => join(event.player_count, event.event_id, user, data.users[user].events) } >Join</button>
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
