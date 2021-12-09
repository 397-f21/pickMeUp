import EventCard from "./EventCard";

const PersonalEvents = ({data, user}) => {
    if (!user) return <h4 className='text-center mt-3'>Please sign in to see your events.</h4>;

    return (
    <div className='container'>
        <h4 className='text-center mt-3' data-cy="personal-names">{user.displayName}'s Events</h4>
        {(data.users[user.uid] && data.users[user.uid].events)
         ? data.users[user.uid].events.map((event_id, idx) => <EventCard data={data} event={data.events[event_id]} user={user.uid} key={idx}/> )
        : <p className="text-center mt-3">You have no events. Go join some!</p>}
    </div>
    )
};


export default PersonalEvents