import { render } from '@testing-library/react';
import EventList from './EventList';
import data from '../../docs/schema.json';

test('show only tennis events when filtering by tennis', () => {
  const eventlist = render(
    <EventList 
      data={data} 
      sport="idS0"
      court="" 
      date="" 
      user="idU0" />
  );

  expect(eventlist.getAllByTestId('event_name').every(event => event.textContent.match(/tennis/i))).toBeTruthy();
});


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