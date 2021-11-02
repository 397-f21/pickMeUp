import { FcSportsMode } from "react-icons/fc";
import { updateDataByPath } from "../firebase";


const join = (player_count, event_id,user,userEvents) => {
    if (!userEvents){
      userEvents = []
    }
    updateDataByPath(`/users/${user}/`, {user_id: user, events: [...userEvents, event_id]})
    updateDataByPath(`/events/${event_id}/`, {player_count:player_count+1})
      
  }
  
const leave = (player_count, event_id,user,userEvents) => {
    if (!userEvents){
        userEvents = []
    }
    updateDataByPath(`/users/${user}/`, {events: userEvents.filter(event => event !== event_id)})
    updateDataByPath(`/events/${event_id}/`, {player_count: (player_count > 0) ? player_count-1 : 0})
}

const EventCard = ({data, event, user}) => (
  <div className = 'col-lg-8 card m-2 p-1 mx-auto border-dark' key = {event.event_id}> 
    <div className = 'card-body d-flex align-items-center justify-content-between'>
      <div>
        <div className="fw-bold" data-testid="event_name">
          { data.sports[event.sport_id].name }
        </div>
        <div data-testid="court_name">
          { data.sports[event.sport_id].courts[event.court_id].name }
        </div>
        <div className="card-text">
          { (new Date(event.date*1000)).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}) }
        </div>
      </div>
      <div className="d-flex flex-nowrap flex-column align-items-center">
        <div data-testid ="player_count" className="mb-1">
          { event.player_count }
          <FcSportsMode style={{height: '1.5em', width: '1.5em'}}/>
        </div>
        {
        ( data.users[user].events && data.users[user].events.includes(event.event_id)) ? (
          <button data-testid="leave_button" className='btn btn-warning bg-opacity-25' style={{width:"6em"}} onClick={ (ev) => leave(event.player_count, event.event_id, user, data.users[user].events) } >Leave</button>
        ) : (
          <button data-testid="join_button" className='btn btn-success bg-opacity-25' style={{width:"6em"}} onClick={ (ev) => join(event.player_count, event.event_id, user, data.users[user].events) } >Join</button>
        )
        }
      </div>
    </div>
  </div>
);

export default EventCard;
