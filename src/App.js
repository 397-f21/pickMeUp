import { useUserState, useData } from "./firebase";
import {useState} from 'react'
import EventFilterModal from "./components/EventFilterModal";
import EventList from "./components/EventList";
import SportHeader from "./components/SportHeader";
import SportSelection from "./components/SportSelection";
import EventCreateModal from "./components/EventCreateModal";
import PersonalEvents from "./components/PersonalEvents";

function App() {
  const [data, loading, error] = useData("/")
  const [user] = useUserState();
  const [sport, setSport] = useState('')
  const [court, setCourt] = useState('')
  const [date, setDate] = useState()

  const [showFilter, setShowFilter] = useState(false);
  const [showEventCreate, setShowEventCreate] = useState(false);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  const handleCloseEventCreate = () => setShowEventCreate(false);
  const handleShowEventCreate = () => setShowEventCreate(true);

  if (error) return <h1>{error}</h1>
  if (loading) return <h1>loading...</h1>
  if (window.location.pathname === '/PersonalEvents') return <PersonalEvents data={data} user={user} />
  console.log(window.location.pathname)
  if (!sport) return <SportSelection sports ={data.sports} setSport = {setSport}/> 

  return (
    <div className="container">
     
      {sport && (<SportHeader data={data} sport={sport} />)}

      <div className="text-center">
      <button className="btn btn-primary" onClick={handleShowFilter}>
        Filter Events
      </button>
      {user && (
        <button data-test-id="create_event" className="btn btn-primary mx-2" onClick={() => handleShowEventCreate()}>
          Create Event
        </button>
      )}
      
      </div>

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

      {showEventCreate && user && (
        <EventCreateModal
            handleClose={handleCloseEventCreate}
            data={data}
            sport={sport}
            user={user.uid}/>
      )}

      <EventList data={data} sport={sport} court={court} date={date} user={user && user.uid} />
    </div>
  );
}

export default App;
