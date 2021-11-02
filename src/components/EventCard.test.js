import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import data from '../../docs/schema.json';
import EventCard from './EventCard';


test('EventCard, it renders with right data', () => {
    const eventCard = render(
      <EventCard 
        data={data} 
        event={data.events["idE0"]}
        user="idU0"/>
    );
        
    expect(eventCard.getByTestId('event_name').textContent).toEqual("Tennis");
    expect(eventCard.getByTestId("player_count")).toHaveTextContent("1");
    expect(eventCard.getByTestId("court_name")).toHaveTextContent("Vandy Christie 1");
    expect(eventCard.getByRole('button')).not.toHaveTextContent("Leave");
    expect(eventCard.getByRole('button')).toHaveTextContent("Join");
    
      
  });