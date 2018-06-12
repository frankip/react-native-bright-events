
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import App from '../App';

describe('renders without crashing', () => {
  const wrapper = shallow(<App />);

  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders state correctly', () => {
    expect(wrapper.instance().state.isLoggedIn).toEqual(false);
  });
});
