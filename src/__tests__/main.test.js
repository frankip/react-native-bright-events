import localStorage from 'mock-local-storage';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import expect from 'expect';
import sinon from 'sinon';

import Main from '../components/Main';

global.window = {};
window.localStorage = global.localStorage;

// Enzyme.configure({ adapter: new Adapter() });

const fakeSubmit = sinon.spy();
const fakeOnChange = sinon.spy();

// function setup() {u
//   const options = new ReactRouterEnzymeContext();
//   const props = {
//     state: {
//       eventList: [],
//       isLoggedIn: false,
//       open: false,
//       payload: {},
//       token: localStorage.getItem('access_token'),
//     },
//     onSubmit: fakeSubmit,
//     onChange: fakeOnChange,
//   };
//   return mount(
//     <Main {...props} />,
//     options.get(),q
//   );
// }

describe('Main component', () => {
  const wrapper = shallow(<Main />);
  // const preventDefault = jest.fn();
  it('renders without crashing', () => {
    // expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
