import { useData } from "./firebase";


function App() {
  const [data, loading, error] = useData("/")
  if (error) return <h1>{error}</h1>
  if (loading) return <h1>loading...</h1>
  return (
    <div>
      <h1>PickMeUp</h1>
      {Object.values(data.events).map(event => (
       <div className = 'col-lg-8 card m-2 p-2 mx-auto border-dark'> 
         {event.event_id}
         <div className = 'card-body'>
            <div className="card-title">
              { data.sports[event.sport_id].name }
            </div>
          <div className="card-text">
            {(new Date(event.date*1000)).toLocaleString()}
          </div>
         </div>
       </div> 
      ))}
    </div>
  );
}

export default App;
