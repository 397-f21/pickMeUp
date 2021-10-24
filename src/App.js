import { updateDataByPath, useData } from "./firebase";


const join = (ev, player_count, event_id ) => {
    //ev.target.onclick = ( (ev1) => leave(ev1, player_count, event_id) )
    updateDataByPath(`/events/${event_id}/`, {player_count:player_count+1})
    
}

/*const leave = ( ev, player_count, event_id ) => {
  ev.target.onclick = ( (ev2) => join(ev2, player_count, event_id) )
  updateDataByPath(`/events/${event_id}/`, {player_count: (player_count > 0) ? player_count-1 : 0})
  
}*/



function App() {
  const [data, loading, error] = useData("/")
  if (error) return <h1>{error}</h1>
  if (loading) return <h1>loading...</h1>
  return (
    <div>
      <h1>PickMeUp</h1>
      {Object.values(data.events).map(event => (
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
            <button className='btn btn-primary m-4' onClick={ (ev) => join(ev, event.player_count, event.event_id) } >Join</button>
          </div>
         </div>
       </div> 
      ))}
    </div>
  );
}

export default App;
