import { useUserState, useData } from "./firebase";
import {useState} from 'react'
import EventFilterModal from "./components/EventFilterModal";
import EventList from "./components/EventList";
import SportHeader from "./components/SportHeader";
import SportSelection from "./components/SportSelection";

function App() {
  const [data, loading, error] = useData("/")
  const [user] = useUserState();
  const [sport, setSport] = useState('')
  const [court, setCourt] = useState('')
  const [date, setDate] = useState()

  const [showFilter, setShowFilter] = useState(false);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  if (error) return <h1>{error}</h1>
  if (loading) return <h1>loading...</h1>
  if (!sport) return <SportSelection sports ={data.sports} setSport = {setSport}/> 

  return (
    <div className="container">
     
      {sport && (<SportHeader data={data} sport={sport} />)}

      <div className="text-center">
      <button className="btn btn-primary" onClick={handleShowFilter}>
        Filter Events
      </button>
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

      <EventList data={data} sport={sport} court={court} date={date} user={user && user.uid} />
    </div>
  );
}

export default App;
