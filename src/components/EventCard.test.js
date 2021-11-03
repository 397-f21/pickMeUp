import { render, screen, act } from '@testing-library/react';
import EventCard from './EventCard.js'
import data from '../../docs/schema.json';

test('increment player count on join', () => {
  const evnt = data.events.idE4;
  const usr = data.users.idU0;
  const eventCard = render(
    <EventCard data={data} event={evnt} user={usr}/>
  ) 
  const nameElement = screen.getByTestId('event-card-player-count');

  // check that the text content matches the current player count
  const rg = new RegExp(`${evnt.player_count}`);
  expect(nameElement.textContent.match(rg)).toBeTruthy();
  // fire the button
  // TODO
  // check that the text content is updated
  const rg2 = new RegExp(`${evnt.player_count+1}`);
  //expect(nameElement.textContent.match(rg2)).toBeTruthy();

});