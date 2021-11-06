import EventCard from "./EventCard";

const PersonalEvents = ({data, user}) => (
    <div className='container'>
        <h4 className='text-center'>{user.displayName}'s Events</h4>
        {data.users[user.uid].events.map((event_id, idx) => <EventCard data={data} event={data.events[event_id]} user={user.uid} key={idx}/> )}
    </div>
);


export default PersonalEvents