import React from 'react'
import { render } from '@testing-library/react'
import EventCard from './EventCard'
import data from '../../docs/schema.json';

test('renders with green as default', () => {
  const eventCard = render(
    <EventCard 
      data={data} 
      event={data.events["idE0"]}
      user="idU0"/>
  );
  expect(eventCard.getByTestId('btn btn-success bg-opacity-25')).toBeInTheDocument()
  expect(eventCard.getByRole('button')).toHaveTextContent("Join")
})

test('renders with yellow for leave button', () => {
    const eventCard = render(
        <EventCard 
          data={data} 
          event={data.events["idE0"]}
          user="idU1"/>
      );
    expect(eventCard.getByTestId('btn btn-warning bg-opacity-25')).toBeInTheDocument()
    expect(eventCard.getByRole('button')).toHaveTextContent("Leave")
  })
// import React from 'react';
// import { shallow } from 'enzyme';
// import EventCard from './EventCard';
// import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// Enzyme.configure({ adapter: new Adapter() });
// describe('Test Button component', () => {

//   it('Test click event', () => {
//     const mockCallBack = jest.fn();
//     const eventCard = render(
//                 <EventCard 
//                   data={data} 
//                   event={data.events["idE0"]}
//                   user="idU0"/>
//               );
//     const button = shallow((<join onClick={mockCallBack}> </join>));
//     button.find('join').simulate('click');
//     expect(mockCallBack.mock.calls.length).toEqual(1);
//   });
// });

// describe('Test Button component', () => {
//     it('Test click event', () => {

//       const mockCallBack = jest.fn();
  
//       const button = shallow((<leave onClick={mockCallBack}>leave</leave>));
//       button.find('leave').simulate('click');
//       expect(mockCallBack.mock.calls.length).toEqual(1);
//     });
//   });