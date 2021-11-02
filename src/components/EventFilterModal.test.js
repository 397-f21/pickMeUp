// // import React from 'react';
// // import {Modal}  from 'react-bootstrap';
// // import EventFilterModal from './EventFilterModal';
// // import $ from 'jquery';
// // import ReactDOM from 'react-dom'; 
// // import ReactAddons from 'react/addons';


// // let TestUtils = React.addons.TestUtils;

// // describe('ModalExperimentFunctional', function() {

// //   let page;

// //   beforeEach(() => {
// //     document.body.innerHTML = '';

// //     page = TestUtils.renderIntoDocument(<ModalExperiment/>);
// //   });

// //   fit("click the ok button should open the modal", () => {
// //     expect($('.closeButton').length).toBe(0);
// //     let openButton = ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithClass(page, 'openButton'));

// //     TestUtils.Simulate.click(openButton);


// //     expect($('.closeButton').length).toBe(1);
// //     $('.closeButton').click();
// //     expect($('.closeButton').length).toBe(0);

// //   });
// // });
import { render } from '@testing-library/react';
import EventFilterModal from './EventFilterModal';
import dateInput from './EventFilterModal'
import data from '../../docs/schema.json';

test('Datepicker has default value if date filter is already on', () => {
  const eventfiltermodal = render(
    <EventFilterModal 
      data={data}
      sport='idS0'
      setSport=''
      court=''
      setCourt=''
      date='1635810432'
      setDate= ''
      handleClose= ''
       />
  );

  expect(eventfiltermodal.getByTestId('filterDate').value).toEqual('2021-11-01')
});


