import EventCard from "./EventCard"

const filterEvents = (events, sport, court, date) => {
  let filteredEvents = events
  if (sport)
    filteredEvents = filteredEvents.filter((event) => event.sport_id === sport);

  if (court)
    filteredEvents = filteredEvents.filter((event) => event.court_id === court);

  if (date) {
    const filterDate = (new Date(date*1000)).toLocaleDateString();
    filteredEvents = filteredEvents.filter((event) => (new Date(event.date*1000)).toLocaleDateString() === filterDate);
    console.log(date)
  }
  
  return filteredEvents.sort((e1, e2) => e1.date - e2.date);

}

const EventList = ({data, sport, court, date, user}) => (
  filterEvents(Object.values(data.events), sport, court, date)
    .map(event =>
      <EventCard key={event.event_id} 
        data={data} 
        event={event} 
        user={user} />)
);

export default EventList