import { render, fireEvent, act } from '@testing-library/react';
import { updateDataByPath } from '../firebase.js';
import EventCard from './EventCard.js';
import data from '../../docs/schema.json';



jest.mock('../firebase.js', () => {
  const firebaseModule = jest.requireActual('../firebase.js');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...firebaseModule,
    updateDataByPath: jest.fn((path, value) => true),
  };
});


test('given a user idU1, clicking leave on an event idE5 removes it from the users events', () => {
    const evt = data.events.idE5;
    const usr = "idU1";
    const eventCard = render(
      <EventCard data={data} event={evt} user={usr}/>
    );

    const elem = eventCard.getByTestId("leave-btn")

    // fire the button
    fireEvent.click(elem);

    // check the user events are updated
    expect(updateDataByPath).toBeCalledWith(`/users/idU1/`, {events: ["idE1", "idE0"]})
    

});