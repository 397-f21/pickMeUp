import { render } from '@testing-library/react';
import EventList from './EventList';
import data from '../../docs/schema.json';

test('show only events in SPAC court when filtering Basketball events by court', () =>{
    const eventList = render(
        <EventList
        data={data} 
        sport="idS1"
        court="idC0"
        date="" 
        user="idU0" />
    );

    expect(eventList.getAllByTestId('event_court').every(event => event.textContent.match(/SPAC/i))).toBeTruthy();
});