import { render, screen, act } from '@testing-library/react';
import EventCard from './EventCard.js';
import data from '../../docs/schema.json';

test('given a user is logged in, increment player count on join', () => {
  // mock firebase's updateDataByPath ~ first call updates the user list; second call updates the player_count
  const spyUpateDataByPath = jest
  .spyOn(require('../firebase.js'), 'updateDataByPath')
  .mockImplementationOnce( (path, value) => "success")
  .mockImplementationOnce((path, value) => {
            data.events.idE4.player_count = data.events.idE4.player_count + 1;
            return "success";
          });

  const evnt = data.events.idE4;
  const usr = data.users.idU0;
  const eventCard = render(
    <EventCard data={data} event={evnt} user={usr}/>
  );
  const nameElement = screen.getByTestId('event-card-player-count');

  // check that the text content matches the current player count
  const rg = new RegExp(`${evnt.player_count}`);
  expect(nameElement.textContent.match(rg)).toBeTruthy();
  
  // fire the button
  const btn = document.querySelector("[data-testid=join-btn]");
  act(() => {
    btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  // check that the text content is updated
  const rg2 = new RegExp(`${evnt.player_count+1}`);
  expect(nameElement.textContent.match(rg2)).toBeTruthy();

});