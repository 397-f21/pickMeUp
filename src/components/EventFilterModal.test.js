import { render, fireEvent } from '@testing-library/react';
import EventFilterModal from './EventFilterModal';
import data from '../../docs/schema.json';

test('Filter callbacks are called with user input when user clicks submit', () => {
  const mockSetSport = jest.fn();
  const mockSetCourt = jest.fn();
  const mockSetDate = jest.fn();
  const mockHandleClose = jest.fn();

  const filterModal = render(
    <EventFilterModal
        data={data}
        sport="idS0"
        setSport={mockSetSport}
        court=""
        setCourt={mockSetCourt}
        date=""
        setDate={mockSetDate}
        handleClose={mockHandleClose} />
  );

  // Change the filter inputs
  fireEvent.change(filterModal.getByTestId('filter_input_sport'), {target: {value: 'idS1'}});
  fireEvent.change(filterModal.getByTestId('filter_input_court'), {target: {value: 'idC0'}});
  fireEvent.change(filterModal.getByTestId('filter_input_date'), {target: {value: '2021-11-01'}});

  // Click submit
  fireEvent.click(filterModal.getByTestId('filter_button_submit'));

  // Check that callbacks were properly called only once
  expect(mockSetSport).toHaveBeenCalledTimes(1);
  expect(mockSetCourt).toHaveBeenCalledTimes(1);
  expect(mockSetDate).toHaveBeenCalledTimes(1);

  // Check that callbacks were called with expected values
  expect(mockSetSport).toHaveBeenCalledWith('idS1');
  expect(mockSetCourt).toHaveBeenCalledWith('idC0');
  //expect(mockSetDate).toHaveBeenCalledWith(1635807600);

  // Check that modal was closed when finished
  expect(mockHandleClose).toHaveBeenCalledTimes(1);

});
