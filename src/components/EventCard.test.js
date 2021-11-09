
import { render,fireEvent } from '@testing-library/react';
import data from '../../docs/schema.json';
import EventCard from './EventCard';

test("If user hasn't already joined event, button toggles to join action", () => {
    const eventCard = render(
        <EventCard
        data={data}
        event={data.events.idE0}
        user={null} />
    );
    expect(eventCard.getByTestId("join_button")).toHaveClass("btn btn-success bg-opacity-25");
});

test("If user clicks on leave, the number of players decreases by 1", () => {
    const eventCard = render(
        <EventCard 
        data={data}
        event={data.events.idE1}
        user={data.users.idU1}/>
    );

    fireEvent.click(eventCard.getByTestId("join_button"))
    expect(eventCard.getByTestId("number")).toHaveTextContent("2 / 4")

});
