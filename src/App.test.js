import { render, screen } from '@testing-library/react';
import SportHeader from './components/SportHeader';
import data from '../docs/schema.json';

test('renders sport name', () => {
  const sportHeader = render(
    <SportHeader data={data} sport={'idS1'}/>
  )
  const nameElement = screen.getByTestId('sport-name');
  expect(nameElement.textContent.match(/basketball/i).toBeTruthy);
});