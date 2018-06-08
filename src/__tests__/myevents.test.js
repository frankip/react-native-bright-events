import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Myevents from '../components/myEvents';
import localStorage from 'mock-local-storage';
global.window = {};
window.localStorage = global.localStorage;

describe('Search form', () => {
  const wrapper = shallow(<Myevents />);
  it('Renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
