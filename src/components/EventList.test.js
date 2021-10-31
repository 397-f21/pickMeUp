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